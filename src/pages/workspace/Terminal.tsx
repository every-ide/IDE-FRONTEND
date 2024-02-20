import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as Xterm } from 'xterm';
import { useParams } from 'react-router-dom';
import type { PublishTermial } from '@/src/services/webSocketService';
import 'xterm/css/xterm.css';
import useFileStore from '@/src/store/useFileStore';
import useFileAPI from '@/src/hooks/useFileAPI';
import type { IFile } from '@/src/store/useFileStore';

const Terminal = () => {
  const { containerId } = useParams<{ containerId: string }>();
  const { webSocketService, isConnected } = useWebSocketStore();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const currentCommandRef = useRef<string>('');
  const xtermRef = useRef<Xterm | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { selectedFileId, files, setNeedSave } = useFileStore();
  const { saveFileContent } = useFileAPI();
  const selectedIdRef = useRef<string | undefined>('');
  const filesRef = useRef<IFile[]>();

  useEffect(() => {
    selectedIdRef.current = selectedFileId;
    filesRef.current = files;
  }, [files, selectedFileId]);

  // 초기터미널 세팅
  useEffect(() => {
    if (!xtermRef.current) {
      xtermRef.current = new Xterm({
        fontFamily: '"Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.2,
        cursorBlink: true,
      });
      xtermRef.current.open(terminalRef.current!);
    }
    xtermRef.current.writeln(
      `\x1B[90m터미널이 준비되었습니다. 입력을 시작하세요.\x1B[0m`,
    );
    xtermRef.current.writeln(`\x1B[44m\x1B[37m${currentPath}\x1B[0m`);

    return () => {
      xtermRef.current?.dispose();
    };
  }, []);

  // 구독
  useEffect(() => {
    if (webSocketService && containerId && isConnected) {
      webSocketService.subscribeToDestination(
        `/user/queue/container/${containerId}/terminal`,
        (message) => {
          const { success, content, path } = JSON.parse(message.body);
          if (content) {
            if (success) {
              xtermRef.current?.writeln(content);
            } else {
              xtermRef.current?.writeln(`\x1B[31m${content}\x1B[0m`);
            }
          }
          xtermRef.current?.writeln(`\x1B[44m\x1B[37m${currentPath}\x1B[0m`);
          setCurrentPath(path);
        },
      );
      xtermRef.current?.onData(handleInput);
      // stomp disconnect시, 자동 구독해제
    }
  }, [containerId, webSocketService, isConnected]);

  const sendCommand = useCallback(
    (body: PublishTermial) => {
      if (webSocketService && isConnected && containerId) {
        webSocketService.client.publish({
          destination: `/app/container/${containerId}/terminal`,
          body: JSON.stringify(body),
        });
      }
    },
    [webSocketService, containerId, isConnected],
  );

  const handleInput = (data: string) => {
    if (webSocketService && isConnected) {
      if (data === '\r') {
        // Enter Key
        processCommand();
      } else if (data === '\x7f' || data === '\b') {
        // Backspace
        removeLastCharacter();
      } else {
        appendData(data);
      }
    }
  };

  const needToSave = useCallback(async () => {
    const files = filesRef.current;
    const selectedFileId = selectedIdRef.current;
    const currentFile = files?.find((file) => file.id === selectedFileId);

    if (currentFile?.needSave) {
      const response = await saveFileContent({
        filePath: currentFile.path,
        newContent: currentFile.yorkieDoc!.getRoot().content.toString(),
      });
      if (response?.status === 200) {
        currentFile.yorkieDoc!.update((root) => (root.backendSaved = true));
        setNeedSave(selectedFileId!, false);
      }
    }
  }, []);

  const processCommand = useCallback(async () => {
    const command = currentCommandRef.current.trim();
    // 컴파일 명령어 수행
    if (/^(javac|node|python)\b/.test(command)) {
      // TODO: axios 400 error 해결 후 주석제거 예정
      await needToSave();
    }
    if (command.length > 0) {
      sendCommand({ path: currentPath, command });
    }
    xtermRef.current?.writeln(`\r\n\x1B[44m\x1B[37m${currentPath}\x1B[0m`);
    currentCommandRef.current = '';
  }, [sendCommand, currentPath, needToSave]);

  const removeLastCharacter = () => {
    currentCommandRef.current = currentCommandRef.current.slice(0, -1);
    xtermRef.current?.write('\b \b');
  };

  const appendData = (data: string) => {
    currentCommandRef.current += data;
    xtermRef.current?.write(data);
  };

  return <div ref={terminalRef} className="pl-1 pt-1" />;
};

export default Terminal;
