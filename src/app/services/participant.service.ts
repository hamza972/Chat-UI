import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Participant } from '../models/Participant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    participantCollection: AngularFirestoreCollection<Participant>;
    participant: Observable<Participant[]>;
    participantDoc: AngularFirestoreDocument<Participant>;

    constructor(public afs: AngularFirestore) {
        //this.items = this.afs.collection('items').valueChanges();

        this.participantCollection = this.afs.collection('Users', ref => ref.orderBy('firstName', 'asc'));

        this.items = this.participantCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Item;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.participantCollection.valueChanges();
    }

    add(participant: Participant) {
        this.participantCollection.add(participant);
    }

    delete(participant: Participant) {
        this.participantDoc = this.afs.doc(`Users/${participant.id}`);
        this.participantDoc.delete();
    }

    update(participant: Participant) {
        this.participantDoc = this.afs.doc(`Users/${participant.id}`);
        this.participantDoc.update(participant);
    }
}
