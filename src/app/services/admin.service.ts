import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from '../models/user';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    userCollection: AngularFirestoreCollection<AppUser>;
    admins: Observable<AppUser[]>;
    adminDoc: AngularFirestoreDocument<AppUser>;

    constructor(
        public afs: AngularFirestore,
        private auth: AuthService
    ) {
        //this.items = this.afs.collection('items').valueChanges();
        this.userCollection = this.afs.collection('Users/Admins/All', ref => ref.where('systemRole', '==', 'admin'));
        
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

    add(admin: AppUser) {
        return this.auth.createUser(admin);
       // return this.ownerCollection.add(participant);
    }

    delete(admin: AppUser) {
        this.adminDoc = this.afs.doc(`Users/${admin.id}`);
        this.adminDoc.delete();
    }

    update(admin: AppUser) {
        this.adminDoc = this.afs.doc(`Users/${admin.id}`);
        this.adminDoc.update(admin);
    }
}
