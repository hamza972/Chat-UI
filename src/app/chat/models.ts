export interface MChatRoom {
	id: string;
	lastUpdate: Date;
	members: string[];
	unreadMessages?: number;
}

export interface MChatMessage {
    message: string;
    date: Date;
    sender: string;
    read: boolean;
}

export interface MUser {
    id: string;
    name: string;
    email: string;
    online?: boolean;
}