import { Email } from '../models/email';

export interface EmailDistributionLists {
    id?
    email?: Email;
    List?: Array<string>;
}
