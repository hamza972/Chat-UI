import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Participant } from '../models/participant';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    participantCollection: AngularFirestoreCollection<Participant>;
    participant: Observable<Participant[]>;
    participantDoc: AngularFirestoreDocument<Participant>;

    constructor(
        public afs: AngularFirestore,
        private auth: AuthService
    ) {
        this.participantCollection = this.afs.collection('Users', ref => ref.orderBy('firstName', 'asc'));
    }

    get() {
        return this.participantCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Participant;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    add(participant: Participant) {
        return this.auth.createUser(participant);
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
