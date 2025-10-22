import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';

export type MessageType = 'PRIVATE' | 'GROUP';

export interface ChatMessage {
	id: string;
	senderId: number;
	senderName?: string;
	receiverId?: number;
	receiverName?: string;
	groupId?: number;
	content: string;
	timestamp?: EpochTimeStamp;
	type: MessageType;
}

class WebSocketService {
	private client: Client | null = null;
	private connected = false;

	connect(token: string, userId: string, onMessage: (msg: ChatMessage) => void, groupId?: string) {

		// guard connection
		if (this.client && this.connected) {
			console.warn('WebSocket is already connected');
			return;
		}

		// initialize the STOMP client
		// using SockJS for WebSocket fallback
		this.client = new Client({
			 brokerURL: `ws://localhost:8090/ws`,
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