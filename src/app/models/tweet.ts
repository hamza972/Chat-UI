export interface Tweet {
    id?: string;
    date?: Date;
    content?: string;

    /* Properties are from User model,
    if possible to retrieve data using ID,
    no need to include this */
    userID?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    systemRole?: string;
    roleID?: string;
    roleFirstName?: string;
    roleLastName?: string;
    roleTitle?: string;
    roleAffiliation?: string;
    roleAvatar?: string;
  }
