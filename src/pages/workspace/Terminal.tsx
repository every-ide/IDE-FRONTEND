import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as Xterm } from 'xterm';
import { StompSubscription } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import type { PublishTermial } from '@/src/services/webSocketService';
import 'xterm/css/xterm.css';
const Terminal = () => {
  const { workid: projectId } = useParams<{ workid: string }>();
  const { webSocketService, isConnected } = useWebSocketStore();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const currentCommandRef = useRef<string>('');
  const xtermRef = useRef<Xterm | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const sendCommand = useCallback(
    (body: PublishTermial) => {
      console.log('sendCommand', projectId, body);
      if (webSocketService && isConnected && projectId) {
        webSocketService.client.publish({
          destination: `/app/room/${projectId}/terminal/command`,
          body: JSON.stringify(body),
        });
      }
    },
    [webSocketService, projectId, isConnected],
  );
  useEffect(() => {
    if (webSocketService && projectId && isConnected) {
      console.log(
        'terminal! webSocketService',
        webSocketService,
        projectId,
        isConnected,
      );
      const subscription: StompSubscription = webSocketService.client.subscribe(
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
      return () => subscription.unsubscribe();
    }
  }, [webSocketService, projectId, isConnected]);

  useEffect(() => {
    if (!xtermRef.current) {
      xtermRef.current = new Xterm({
        fontFamily: '"Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.2,
      });
      xtermRef.current.open(terminalRef.current!);
    }

    xtermRef.current.write(`${currentPath}: `);

    const handleInput = (data: string) => {
      if (data === '\r') {
        // Enter Key
        processCommand();
      } else if (data === '\x7f' || data === '\b') {
        // Backspace
        removeLastCharacter();
      } else {
        appendData(data);
      }
    };
    xtermRef.current.onData(handleInput);

    return () => {
      xtermRef.current?.dispose();
    };
  }, [currentPath]);

  const processCommand = () => {
    const command = currentCommandRef.current.trim();
    if (command.length > 0) {
      sendCommand({ path: currentPath, command });
    }
    xtermRef.current?.write('\r\n' + currentPath + ': ');
    currentCommandRef.current = '';
  };

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
