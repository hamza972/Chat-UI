export interface tweet {
    id?:string;
    date?: Date;
    content?: string;

    /* Properties are from User model,
    if possible to retrieve data using ID,
    no need to include this */
    firstName?:string;
    lastName?: string;
    email?: string;
    systemRole?: string;
    role?: string;
    roleFirstName?: string;
    roleLastName?: string;
    rolePosition?: string;
    roleAffiliation?: string;
  }
