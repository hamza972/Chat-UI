import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppUser } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { Country } from '../models/country';
import { Role } from '../models/role';
import { tweetClass } from '../models/tweetClass';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: AppUser;

  user$: Observable<AppUser>;
  userList$: Observable<AppUser[]>;
  countries$: Observable<Country[]>;
  roles$: Observable<Role[]>;
  tweetSend: tweetClass;
  tweets$: Observable<tweetClass[]>;
  news$: Observable<News[]>;
  tweetsOrdered$: Observable<tweetClass[]>;
  tweetDate = new Date();
  tweetDateString: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.countries$ = this.db
      .collection('Countries', (ref) => ref.orderBy('countryName', 'asc'))
      .valueChanges();
    this.tweets$ = this.db
      .collection('Tweets', (ref) => ref.orderBy('tweetDate', 'desc'))
      .valueChanges();
    this.news$ = this.db
      .collection('News', (ref) => ref.orderBy('newsDate', 'desc'))
      .valueChanges();
    this.roles$ = this.db
      .collection('Roles', (ref) => ref.orderBy('roleName', 'asc'))
      .valueChanges();
    this.userList$ = this.db
      .collection('Users', (ref) => ref.orderBy('role', 'asc'))
      .valueChanges();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<AppUser>(`Users/${user.uid}`).valueChanges();
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
          this.router.navigate(['/home']);
        }
      });
  }


  createAdminUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;

        userCredential.user.updateProfile({
          displayName: user.firstName + user.lastName,
        });

        this.sendAdminUserData(userCredential).then(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }



  createControlUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;

        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        });

        this.sendControlUserData(userCredential).then(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  createParticipantUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;

        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        });

        this.sendParticipantUserData(userCredential).then(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }


  sendAdminUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: 'Control',
      systemRole: 'owner',
    });
  }


  sendControlUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/Admins/All${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: 'Control',
      systemRole: 'admin',
    });
  }

  sendParticipantUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/Participants/All${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: this.newUser.role,
      systemRole: 'participant',
      roleFirstName: this.newUser.role.firstName,
      roleLastName: this.newUser.role.lastName,
      roleTitle: this.newUser.role.title,
      roleAffiliation: this.newUser.role.affiliation,
    });
  }

  sendCountryData(newCountry: Country) {
    this.router.navigate(['/control']);
    return this.db.collection(`Countries`).add({
      countryName: newCountry.countryName,
    });
  }

  sendRoleData(newRole: Role) {
    this.router.navigate(['/control']);
    return this.db.collection('Roles').add({
      roleName: newRole.title,
      ofCountry: newRole.affiliation,
      firstName: newRole.firstName,
      lastName: newRole.lastName,
    });
  }

  sendTweetData(newTweet: tweetClass) {
    return this.db.collection('Tweets').add({
      userName: newTweet.userName,
      userEmail: newTweet.userEmail,
      userRole: newTweet.userRole,
      tweetDescription: newTweet.tweetDescription,
      tweetDate: newTweet.tweetDate,
    });
  }

  sendNewsData(newNews: News) {
    return this.db.collection('News').add({
      userName: newNews.userName,
      userEmail: newNews.userEmail,
      userRole: newNews.userRole,
      newsDescription: newNews.newsDescription,
      newsDate: newNews.newsDate,
      newsHeadline: newNews.newsHeadline,
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
    this.router.navigate(['/home']);
    window.location.reload();
    return this.afAuth.auth.signOut();
  }
}
