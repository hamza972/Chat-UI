import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Owner } from '../models/owner';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OwnerService {

    userCollection: AngularFirestoreCollection<Owner>;
    admins: Observable<Owner[]>;
    ownerDoc: AngularFirestoreDocument<Owner>;

    constructor(
        public afs: AngularFirestore,
        private auth: AuthService
    ) {
        //this.items = this.afs.collection('items').valueChanges();
        this.userCollection = this.afs.collection('Users', ref => ref.where('systemRole', '==', 'admin'));
    }
    
   
    


    get() {
        return this.userCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Owner;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    add(admin: Owner) {
        return this.auth.createUser(admin);
       // return this.ownerCollection.add(participant);
    }

    delete(admin: Owner) {
        this.ownerDoc = this.afs.doc(`Users/${admin.id}`);
        this.ownerDoc.delete();
    }

    update(admin: Owner) {
        this.ownerDoc = this.afs.doc(`Users/${admin.id}`);
        this.ownerDoc.update(admin);
    }
}
