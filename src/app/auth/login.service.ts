import { Injectable, DoBootstrap } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { appUser } from "../models/user";
import { switchMap } from "rxjs/operators";
import { country } from "../models/country";
import { Role } from "../models/role";
import { stringify } from "querystring";
import { tweetClass } from "../models/tweetClass";
import { newsClass } from "../models/newsClass";
import { Email } from "../models/email";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: appUser;

  user$: Observable<appUser>;
  userList$: Observable<appUser[]>;
  countries$: Observable<country[]>;
  roles$: Observable<Role[]>;
  tweetSend: tweetClass;
  tweets$: Observable<tweetClass[]>;
  news$: Observable<newsClass[]>;
  tweetsOrdered$: Observable<tweetClass[]>;
  tweetDate = new Date();
  tweetDateString: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.countries$ = this.db
      .collection("Countries", (ref) => ref.orderBy("countryName", "asc"))
      .valueChanges();
    this.tweets$ = this.db
      .collection("Tweets", (ref) => ref.orderBy("tweetDate", "desc"))
      .valueChanges();
    this.news$ = this.db
      .collection("News", (ref) => ref.orderBy("newsDate", "desc"))
      .valueChanges();
    this.roles$ = this.db
      .collection("Roles", (ref) => ref.orderBy("roleName", "asc"))
      .valueChanges();
    this.userList$ = this.db
      .collection("Users", (ref) => ref.orderBy("role", "asc"))
      .valueChanges();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<appUser>(`Users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUserCurrent() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.eventAuthError.next(error);
      })
      .then((userCredential) => {
        if (userCredential) {
          this.router.navigate(["/home"]);
        }
      });
  }

  createControlUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;

        userCredential.user.updateProfile({
          displayName: user.firstName + " " + user.lastName,
        });

        this.sendControlUserData(userCredential).then(() => {
          this.router.navigate(["/home"]);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  createParticipantUser(userP) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(userP.email, userP.password)
      .then((userCredential) => {
        this.newUser = userP;

        userCredential.user.updateProfile({
          displayName: userP.firstName + " " + userP.lastName,
        });

        this.sendParticipantUserData(userCredential).then(() => {
          this.router.navigate(["/home"]);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  sendControlUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: "Control",
      systemRole: "admin",
    });
  }

  sendParticipantUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: this.newUser.role,
      systemRole: "participant",
      roleFirstName: this.newUser.roleFirstName,
      roleLastName: this.newUser.roleLastName,
      rolePosition: this.newUser.rolePosition,
      roleAffiliation: this.newUser.roleAffiliation,
    });
  }

  sendCountryData(newCountry: country) {
    this.router.navigate(["/control"]);
    return this.db.collection(`Countries`).add({
      countryName: newCountry.countryName,
    });
  }

  sendRoleData(newRole: Role) {
    this.router.navigate(["/control"]);
    return this.db.collection(`Roles`).add({
      roleName: newRole.roleName,
      ofCountry: newRole.ofCountry,
      firstName: newRole.firstName,
      lastName: newRole.lastName,
    });
  }

  sendTweetData(newTweet: tweetClass) {
    return this.db.collection(`Tweets`).add({
      userName: newTweet.userName,
      userEmail: newTweet.userEmail,
      userRole: newTweet.userRole,
      tweetDescription: newTweet.tweetDescription,
      tweetDate: newTweet.tweetDate,
    });
  }

  sendNewsData(newNews: newsClass) {
    return this.db.collection(`News`).add({
      userName: newNews.userName,
      userEmail: newNews.userEmail,
      userRole: newNews.userRole,
      newsDescription: newNews.newsDescription,
      newsDate: newNews.newsDate,
      newsHeadline: newNews.newsHeadline
  });
  }

  sendEmail(email: Email) {
    return this.db.collection(`Emails`).add({
      subject: email.subject,
      date: new Date(),
      draft: false,
      from: {
        user: email.from.user,
        deleted: false,
      },
      to: {
        user: email.to.user,
        deleted: false,
      },
      body: email.body,
    });
  }

  draftEmail(email: Email) {
    return this.db.collection(`Emails`).add({
      subject: email.subject,
      date: new Date(),
      draft: true,
      from: {
        user: email.from.user,
        deleted: false,
      },
      to: {
        user: email.to.user,
        deleted: false,
      },
      body: email.body,
    });
  }

  getRoles() {
    return this.roles$;
  }

  getTweets() {
    return this.tweets$;
  }

  getNews() {
    return this.news$;
  }

  getCountries() {
    return this.countries$;
  }

  getUserList() {
    return this.userList$;
  }

  logout() {
    this.router.navigate(["/home"]);
    window.location.reload();
    return this.afAuth.auth.signOut();
  }
}
