export interface Email {
  id?: String;
  date?: Date;
  subject: String;
  body: String;
  draft?: Boolean;
  from: {
    user: String;
    deleted?: Boolean;
  };
  to: {
    user: String;
    deleted?: Boolean;
  };
}
