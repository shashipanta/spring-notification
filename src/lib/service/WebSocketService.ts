import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';

export type MessageType = 'PRIVATE' | 'GROUP';

export interface ChatMessage {
	senderId: number;
	receiverId?: number;
	groupId?: number;
	content: string;
	timestamp?: string;
	type: MessageType;
}

class WebSocketService {
	private client: Client | null = null;
	private connected = false;

	connect(token: string, userId: string, onMessage: (msg: ChatMessage) => void, groupId?: string) {
		this.client = new Client({
			 brokerURL: `ws://localhost:8090/ws?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXdhakB5b3BtYWlsLmNvbSIsInVzZXJJZCI6NCwiaWF0IjoxNzUzNzM2Nzg0LCJleHAiOjE3NTQ2MDA3ODR9.FcSYWPsO47P7dzoB6c3Wx07f__DYUvfAZXUFXzfSygo`,
			// webSocketFactory: () => new SockJS('http://localhost:8090/ws'),
			connectHeaders: {
				Authorization: `Bearer ${token}`
			},
			reconnectDelay: 5000,
			onConnect: () => {
				this.connected = true;

				this.client?.subscribe(`/topic/private/${userId}`, (message: IMessage) => {
					onMessage(JSON.parse(message.body));
				});

				if (groupId) {
					this.client?.subscribe(`/topic/group/${groupId}`, (message: IMessage) => {
						onMessage(JSON.parse(message.body));
					});
				}
			},
			onStompError: (frame) => {
				console.error('STOMP error:', frame.headers['message'], frame.body);
			}
		});

		this.client.activate();
	}

	sendMessage(message: ChatMessage) {
		if (this.connected && this.client?.connected) {
			this.client.publish({
				destination: '/app/chat.send',
				body: JSON.stringify(message)
			});
		}
	}

	disconnect() {
		if (this.client) {
			this.client.deactivate();
			this.connected = false;
		}
	}
}

export const wsService = new WebSocketService();