export interface MChatRoom {
	id: string;
	lastUpdate: Date;
	members: string[];
	unreadMessages?: number;
    user?: MUser;
    users?: MUser[];
}

export interface MChatMessage {
    message: string;
    date: Date;
    sender: string;
    read?: boolean;
    messageId?: string;
}

export interface MUser {
    id: string;
    name: string;
    email: string;
    online?: boolean;
}