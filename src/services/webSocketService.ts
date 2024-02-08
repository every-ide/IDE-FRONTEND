import SockJS from 'sockjs-client';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

export interface WebSocketConnectOptions {
  token: string;
  projectId: string;
}

export interface PublishTermial {
  path: string;
  command: string;
}

export class WebSocketService {
  private client: Client;
  private baseUrl: string = import.meta.env.VITE_API_BASE_URL;

  constructor(options: WebSocketConnectOptions) {
    const { token, projectId } = options;
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.baseUrl}/ws`),
      // Q: 실제로 headers 어떤 용도로 쓰지? 인증? 유저구분?
      connectHeaders: {
        Authorization: token,
        ProjectId: projectId,
      },
      debug: function (str) {
        console.log('str', str);
      },
      onConnect: () => {
        console.log('성공!!!');
      },
      onStompError: () => {
        console.log('실패 ㅠㅠ');
      },
    });
    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
  }

  // subscribe example
  // subscribeToTopic(topic: string, callback: (message: IMessage) => void) {
  //   this.client.subscribe(topic, (message) => {
  //     callback(message);
  //   });
  // }

  // subscribeToTerminal(
  //   queue: string,
  //   callback: (message: IMessage) => void,
  // ): StompSubscription {
  //   return this.client.subscribe(queue, callback);
  // }

  // publish(destination: string, body: PublishTermial) {
  //   if (this.client && this.client.active) {
  //     this.client.publish({ destination, body: JSON.stringify(body) });
  //   }
  // }
}
