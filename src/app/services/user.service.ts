import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from '../models/user';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<AppUser>;
  user: Observable<AppUser[]>;
  userDoc: AngularFirestoreDocument<AppUser>;

  constructor(
      public afs: AngularFirestore,
      private auth: AuthService
  ) {
      this.userCollection = this.afs.collection<AppUser>('Users', ref => ref.orderBy('firstName', 'asc'));
  }

  get() {
      return this.userCollection.snapshotChanges().pipe(map(changes => {
          return changes.map(a => {
              const data = a.payload.doc.data() as AppUser;
              data.id = a.payload.doc.id;
              return data;
          });
      }));
  }

  getAdmins() {
    const adminsCollection = this.afs.collection('Users', (ref) =>
    ref
      .where('systemRole', '==', 'admin')
      .orderBy('firstName', 'asc')
    );
    return adminsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as AppUser;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getParticipants() {
    return this.afs.collection<AppUser>('Users', (ref) =>
    ref
      .where('systemRole', '==', 'participant')
      .orderBy('firstName', 'asc')
    ).snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as AppUser;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  add(user: AppUser) {
      console.log('userService', user);
      return this.auth.createUser(user);
  }

  delete(user: AppUser) {
      this.userDoc = this.afs.doc('Users/${user.id}');
      this.userDoc.delete();
  }

  update(user: AppUser) {
      this.userDoc = this.afs.doc('Users/${user.id}');
      this.userDoc.update(user);
  }
}
