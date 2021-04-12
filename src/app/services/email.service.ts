import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Email } from '../models/email';
import { AppUser as User } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  emailCollection: AngularFirestoreCollection<Email>;
  email: Observable<Email[]>;
  emailDoc: AngularFirestoreDocument<Email>;

  constructor(
    public afs: AngularFirestore,
    public auth: LoginService,
    private db: AngularFirestore
  ) {}

  sendEmail(email: Email): Promise <firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> { //Sean: returns a promise to the function that called it
    var promise: Promise <firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>; //create the promise
    promise = this.db.collection(`Emails`).add({
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
    return(promise); //returns the promise
  }

  draftEmail(email: Email): Promise <firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>  { //Sean: returns a promise to the function that called it
    var promise: Promise <firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>; //create the promise
    promise = this.db.collection(`Emails`).add({
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
    return(promise); //returns the promise
  }

  inbox(user: User) {
    console.log('Geting emails for user ' + user.email);
    this.emailCollection = this.afs.collection('Emails', (ref) =>
      ref
        .where('to.user', '==', user.email) 
        .where('to.deleted', '==', false)
        .where('draft', '==', false)
    );
    return this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  sent(user: User) {
    this.emailCollection = this.afs.collection('Emails', (ref) =>
      ref
        .where('from.user', '==', user.email)
        .where('from.deleted', '==', false)
        .where('draft', '==', false)
    );

    return this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  drafts(user: User) {
    this.emailCollection = this.afs.collection('Emails', (ref) =>
      ref
        .where('from.user', '==', user.email)
        .where('from.deleted', '==', false)
        .where('draft', '==', true)
    );

    return this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  deleted(user: User) {
    return combineLatest([
      this.inboxDeleted(user),
      this.sentDeleted(user),
    ]);
  }

  inboxDeleted(user: User) {
    this.emailCollection = this.afs.collection('Emails', (ref) =>
      ref.where('to.user', '==', user.email).where('to.deleted', '==', true)
    );

    return this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  sentDeleted(user: User) {
    this.emailCollection = this.afs.collection('Emails', (ref) =>
      ref.where('from.user', '==', user.email).where('from.deleted', '==', true)
    );

    return this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  update(email: Email): Promise<void>{ //Sean: New method to update existing emails
    this.emailDoc = this.afs.doc(`Emails/${email.id}`);
      return(this.emailDoc.update(email)); //Sean: Returns Promise
  } 

  delete(email: Email) {
    this.emailDoc = this.afs.doc(`Emails/${email.id}`);
    this.emailDoc.update(email);
  }

  //hardDelete(email: Email) { //Functionality removed, emails cannot be deleted
    //this.emailDoc = this.afs.doc(`Emails/${email.id}`);
    //this.emailDoc.delete();
  //}
}