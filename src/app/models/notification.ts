import { Role } from '../models/role';

export interface Notification {
    id?: string;
    type?: string;
    role?: Role;
    date?: Date;
    viewed?: boolean;
}
