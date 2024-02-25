import { Client, IMessage } from '@stomp/stompjs';

export interface WebSocketConnectOptions {
  token: string;
  projectId: string;
}

export interface PublishTermial {
  path: string;
  command: string;
}

export class WebSocketService {
  client: Client;
  subscriptions: Array<{
    destination: string;
    callback: (message: IMessage) => void;
  }> = [];

  constructor(options: WebSocketConnectOptions) {
    const { token, projectId } = options;

    this.client = new Client({
      //brokerURL: 'ws://43.203.66.34:8000/ws/websocket',
      brokerURL: 'wss://k547f55f71a44a.user-app.krampoline.com/ws/websocket',
      connectHeaders: {
        Authorization: token,
        ProjectId: projectId,
      },
      debug: function () {
        // console.log('websocket debug->', str);
      },
      onConnect: () => {
        console.log('stomp 연결성공');
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 해제됨');
      },
      onStompError: () => {
        console.log('STOMP Error 발생');
      },
    });
  }

  activate() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  subscribeToDestination(
    destination: string,
    callback: (message: IMessage) => void,
    accessToken?: string,
    projectId?: string,
  ) {
    this.subscriptions.push({ destination, callback });
    // accessToken이 제공되면, 구독 헤더에 추가
    this.client.subscribe(
      destination,
      callback,
      accessToken && projectId
        ? { Authorization: `${accessToken}`, projectId }
        : {},
    );
  }
}
