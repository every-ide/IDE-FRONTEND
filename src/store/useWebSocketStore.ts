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
      console.log('zustand - WebSocket 연결 성공!!!');
      set({ isConnected: true });
    };
    webSocketService.client.onDisconnect = () => {
      console.log('zustand - WebSocket 연결 해제됨');
      set({ isConnected: false });
    };

    console.log('connect zustand', webSocketService);
    set({ webSocketService, isConnected: webSocketService.isConnected }); // 초기 상태

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
