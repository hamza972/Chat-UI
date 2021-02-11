export interface AppUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  IsOwner?: boolean;
  email?: string;
  systemRole?: string;
  role?: string;
  roleID?: string;
  roleFirstName?: string;
  roleLastName?: string;
  roleTitle?: string;
  roleAffiliation?: string;
  rolePosition?: string;
  profileImage?: string;
  password?: string;
  emailSent?: number;
  emailRecieved?: number;
  time?: number;
  }
