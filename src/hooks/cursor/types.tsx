import { useState } from 'react';

interface CursorState {
  [userId: string]: {
    head: {
      x: number;
      y: number;
    };
    anchor: {
      x: number;
      y: number;
    };
  };
}

const [cursorState, setCursorState] = useState<CursorState>({});
