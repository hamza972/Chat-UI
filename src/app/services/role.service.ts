import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    roleCollection: AngularFirestoreCollection<Role>;
    role: Observable<Role[]>;
    roleDoc: AngularFirestoreDocument<Role>;

    constructor(public afs: AngularFirestore) {
        //this.items = this.afs.collection('items').valueChanges();

        this.roleCollection = this.afs.collection('Roles', ref => ref.orderBy('roleName', 'asc'));

        this.items = this.roleCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Item;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.roleCollection.valueChanges();
    }

    add(role: Role) {
        this.roleCollection.add(participant);
    }

    delete(role: Role) {
        this.roleDoc = this.afs.doc(`Roles/${role.id}`);
        this.roleDoc.delete();
    }

    update(role: Role) {
        this.roleDoc = this.afs.doc(`Roles/${role.id}`);
        this.roleDoc.update(participant);
    }
}
