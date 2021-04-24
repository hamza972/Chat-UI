export interface Email {
  id?: string;
  date?: Date;
  subject?: string;
  body?: string;
  draft?: boolean;
  from?: {
    user?: string;
    deleted?: boolean;
    actualuser?: string;
  };
  to?: {
    user?: string;
    deleted?: boolean;
  };
}
