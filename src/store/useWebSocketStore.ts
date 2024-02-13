import { create } from 'zustand';
import { WebSocketService } from '@/src/services/webSocketService';
import type { WebSocketConnectOptions } from '@/src/services/webSocketService';

interface WebSocketState {
  webSocketService: WebSocketService | null;
  connect: (options: WebSocketConnectOptions) => void;
  disconnect: () => void;
}

const useWebSocketStore = create<WebSocketState>((set) => ({
  webSocketService: null,
  connect: (options) => {
    const webSocketService = new WebSocketService(options);
    console.log('connect zustand', webSocketService);
    set({ webSocketService });
  },
  disconnect: () => {
    set((state) => {
      state.webSocketService?.disconnect();
      return { webSocketService: null };
    });
  },
}));

export default useWebSocketStore;
