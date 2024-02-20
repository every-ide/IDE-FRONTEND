import { create } from 'zustand';
import { WebSocketService } from '@/src/services/webSocketService';
import type { WebSocketConnectOptions } from '@/src/services/webSocketService';

interface WebSocketState {
  webSocketService: WebSocketService | null;
  isConnected: boolean;
  connect: (options: WebSocketConnectOptions) => void;
  disconnect: () => void;
}

const useWebSocketStore = create<WebSocketState>((set) => ({
  webSocketService: null,
  isConnected: false,
  connect: (options) => {
    const webSocketService = new WebSocketService(options);
    webSocketService.client.onConnect = () => {
      console.log('연결성공하였습니다.');
      set({ isConnected: true });
      webSocketService.subscriptions.forEach((sub) => {
        webSocketService.client.subscribe(sub.destination, sub.callback);
      });
    };
    webSocketService.client.onDisconnect = () => {
      set({ isConnected: false });
    };

    set({ webSocketService, isConnected: false }); // 초기 상태

    webSocketService.activate(); // 연결 활성화
  },
  disconnect: () => {
    set((state) => {
      state.webSocketService?.disconnect();
      return { webSocketService: null, isConnected: false };
    });
  },
}));

export default useWebSocketStore;
