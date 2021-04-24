export interface Email {
  id?: string;
  date?: Date;
  subject?: string;
  body?: string;
  draft?: boolean;
  from?: {
    user?: string;
    deleted?: boolean;
    actualuser?: string; //The actual name of the participant sending the email, for future use in assessment tools. Should only be visable to control
  };
  to?: {
    user?: string;
    deleted?: boolean;
  };
}
