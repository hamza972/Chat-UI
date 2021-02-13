import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Affiliate } from '../models/affiliate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AffiliateService {

    affiliateCollection: AngularFirestoreCollection<Affiliate>;
    affiliates: Observable<Affiliate[]>;
    affiliateDoc: AngularFirestoreDocument<Affiliate>;

    constructor(public afs: AngularFirestore) {
        this.affiliateCollection = this.afs.collection('Affiliates', ref => ref.orderBy('name', 'asc'));
    }

    get() {
        return this.affiliates = this.affiliateCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Affiliate;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    getAffiliate(id: string) {
        return this.afs.collection('Affiliates').doc(id).valueChanges();
    }

    add(affiliate: Affiliate) {
        this.affiliateCollection.add(affiliate).then(doc => {
            affiliate.id = doc.id;
            this.update(affiliate);
        });
    }

    delete(affiliate: Affiliate) {
        this.affiliateDoc = this.afs.doc(`Affiliates/${affiliate.id}`);
        this.affiliateDoc.delete();
    }

    update(affiliate: Affiliate) {
        this.affiliateDoc = this.afs.doc(`Affiliates/${affiliate.id}`);
        this.affiliateDoc.update(affiliate);
    }
}
