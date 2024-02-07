import { create } from 'zustand';
import { WebSocketService } from '@/src/services/webSocketService';

interface WebSocketState {
  webSocketService: WebSocketService | null;
  connect: (options: { token: string; projectId: string }) => void;
  disconnect: () => void;
}

const useWebSocketStore = create<WebSocketState>((set) => ({
  webSocketService: null,
  connect: (options) => {
    const webSocketService = new WebSocketService(options);
    webSocketService.activate();
    set({ webSocketService });
  },
  disconnect: () => {
    set((state) => {
      state.webSocketService?.deactivate();
      return { webSocketService: null };
    });
  },
}));

export default useWebSocketStore;
