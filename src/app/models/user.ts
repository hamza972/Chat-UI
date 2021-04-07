import { Role } from '../models/role';

export interface AppUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  IsOwner?: boolean;
  email?: string;
  systemRole?: string;
  role?: Role;
  profileImage?: string;
  password?: string;
  emailSent?: number;
  emailRecieved?: number;
  time?: number;
  }
