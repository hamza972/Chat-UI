import { AppUser } from '../models/user';

export interface Tweet {
    id?: string;
    date?: Date;
    content?: string;
    hashtag?: string[];
    mention?: string[];
    user?: AppUser;
  }
