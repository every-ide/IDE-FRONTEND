import SockJS from 'sockjs-client';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

interface WebSocketConnectOptions {
  token: string;
  projectId: string;
}

export class WebSocketService {
  private client: Client;
  private baseUrl: string = import.meta.env.VITE_API_BASE_URL;

  constructor(options: WebSocketConnectOptions) {
    const { token, projectId } = options;
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.baseUrl}/ws`),
      connectHeaders: {
        Authorization: token,
        ProjectId: projectId,
      },
    });

    this.client.onConnect = () => {
      console.log('Connected');
      // 초기 구독설정 가능
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };
  }

  activate() {
    this.client.activate();
  }

  deactivate() {
    this.client.deactivate();
  }

  // subscribe example
  subscribeToTopic(topic: string, callback: (message: IMessage) => void) {
    this.client.subscribe(topic, (message) => {
      callback(message);
    });
  }

  subscribeToTerminal(
    queue: string,
    callback: (message: IMessage) => void,
  ): StompSubscription {
    return this.client.subscribe(queue, callback);
  }
}
