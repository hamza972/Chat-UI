import { Email } from '../models/email';

export interface EmailDistributionLists {
    id?
    email?: string;
    List?: Array<string>;
}
