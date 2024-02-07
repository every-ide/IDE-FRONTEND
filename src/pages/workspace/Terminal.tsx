import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useEffect, useRef, useState } from 'react';
import { Terminal as Xterm } from 'xterm';
import { StompSubscription } from '@stomp/stompjs';
import 'xterm/css/xterm.css';
const Terminal = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const currentCommandRef = useRef<string>('');
  const xtermRef = useRef<Xterm | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const webSocketService = useWebSocketStore((state) => state.webSocketService);

  const sendCommand = () => {
    if (webSocketService) {
      webSocketService.publish('/app/room/123456/terminal', {
        data: 'some data',
      });
    }
  };
  useEffect(() => {
    let subscription: StompSubscription | null = null;
    if (webSocketService) {
      subscription = webSocketService.subscribeToTerminal(
        '/user/queue/room/123456/terminal',
        (message) => {
          console.log('터미널 구독 message', message);
        },
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [webSocketService]);

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
        console.log('Executing command:', currentCommand);
        xtermRef.current?.write('\r\n' + currentPath + ': ');
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
  }, [currentPath]);

  return <div ref={terminalRef} className="pl-1 pt-1" />;
};

export default Terminal;
