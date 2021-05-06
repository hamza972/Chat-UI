import { Role } from '../models/role';

export interface Notification {
    id?: string;
    type?: string;
    role?: Role;
    date?: Date;
    from?: Role;
    viewed?: boolean;
}
