import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AffiliateService {

    affiliateCollection: AngularFirestoreCollection<Role>;
    affiliate: Observable<Role[]>;
    roleDoc: AngularFirestoreDocument<Role>;

    constructor(public afs: AngularFirestore) {
        //this.items = this.afs.collection('items').valueChanges();

        this.affiliateCollection = this.afs.collection('Countries', ref => ref.orderBy('countryName', 'asc'));

        this.affiliate = this.affiliateCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Role;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.affiliateCollection.valueChanges();
    }

    add(affiliate: Role) {
        this.affiliateCollection.add(affiliate);
    }

    delete(affiliate: Role) {
        this.roleDoc = this.afs.doc(`Countries/${affiliate.id}`);
        this.roleDoc.delete();
    }

    update(affiliate: Role) {
        this.roleDoc = this.afs.doc(`Countries/${affiliate.id}`);
        this.roleDoc.update(affiliate);
    }
}
