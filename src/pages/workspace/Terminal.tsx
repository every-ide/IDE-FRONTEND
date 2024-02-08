import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as Xterm } from 'xterm';
import { StompSubscription } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import type { PublishTermial } from '@/src/services/webSocketService';
import 'xterm/css/xterm.css';
const Terminal = () => {
  const { workid: projectId } = useParams<{ workid: string }>();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const currentCommandRef = useRef<string>('');
  const xtermRef = useRef<Xterm | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const webSocketService = useWebSocketStore((state) => state.webSocketService);

  const sendCommand = useCallback(
    (body: PublishTermial) => {
      if (webSocketService && projectId) {
        webSocketService.publish(`/app/room/${projectId}/terminal`, body);
      }
    },
    [webSocketService, projectId],
  );
  useEffect(() => {
    let subscription: StompSubscription | null = null;
    if (webSocketService && projectId) {
      subscription = webSocketService.subscribeToTerminal(
        `/user/queue/room/${projectId}/terminal`,
        (message) => {
          console.log('터미널 구독 message', message);
          const { success, content, path } = JSON.parse(message.body);
          if (success && content) {
            xtermRef.current?.write(content + '\r\n' + '\r\n');
          }
          xtermRef.current?.write(path + ': ');
          setCurrentPath(path);
        },
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [webSocketService, projectId]);

  useEffect(() => {
    // 터미널 인스턴스 생성
    xtermRef.current = new Xterm({
      fontFamily: '"Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.2,
    });
    if (terminalRef.current && xtermRef.current) {
      xtermRef.current.open(terminalRef.current);
      xtermRef.current.write(`${currentPath}: `);
    }

    const handleInput = (data: string) => {
      if (data === '\r') {
        processCommand();
      } else if (data === '\x7f' || data === '\b') {
        removeLastCharacter();
      } else {
        appendData(data);
      }
    };

    const processCommand = () => {
      const currentCommand = currentCommandRef.current;
      if (currentCommand === '') {
        xtermRef.current?.write('\r\n' + currentPath + ': ');
      } else {
        const body = {
          path: currentPath,
          command: currentCommandRef.current,
        };
        sendCommand(body);
        xtermRef.current?.write('\r\n');
        currentCommandRef.current = '';
      }
    };

    const removeLastCharacter = () => {
      currentCommandRef.current = currentCommandRef.current.slice(0, -1);
      xtermRef.current?.write('\b \b');
    };

    const appendData = (data: string) => {
      currentCommandRef.current += data;
      xtermRef.current?.write(data);
    };

    const terminalInputHandler = xtermRef.current.onData(handleInput);

    return () => {
      terminalInputHandler.dispose();
    };
  }, [currentPath, sendCommand]);

  return <div ref={terminalRef} className="pl-1 pt-1" />;
};

export default Terminal;
