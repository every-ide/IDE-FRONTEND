import { useEffect, useRef, useState } from 'react';
import { Terminal as Xterm } from 'xterm';
import 'xterm/css/xterm.css';
const Terminal = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const xtermRef = useRef<Xterm | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    xtermRef.current = new Xterm({
      fontFamily: '"Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.2,
    });
    if (terminalRef.current && xtermRef.current) {
      xtermRef.current.open(terminalRef.current);
      xtermRef.current.write('/: ');
    }

    let currentCommand = '';
    const termincalInputHandler = xtermRef.current.onData((data) => {
      if (data === '\r') {
        if (currentCommand === '') {
          xtermRef.current?.write('\r\n' + currentPath + ': ');
        } else {
          return;
        }
      } else if (data === '\x7f' || data === '\b') {
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          if (xtermRef.current) {
            xtermRef.current.write('\b \b');
          }
        }
      } else {
        currentCommand += data;
        xtermRef.current?.write(data);
      }
    });

    return () => {
      // unmout 시, 이벤트 리스너들 제거
      termincalInputHandler.dispose();
    };
  }, []);
  return <div ref={terminalRef} className="pl-1 pt-1" />;
};

export default Terminal;
