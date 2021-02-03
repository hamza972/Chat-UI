import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { scenario } from '../models/scenario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScenarioService {

    scenarioCollection: AngularFirestoreCollection<scenario>;
    scenario: Observable<scenario[]>;
    scenarioDoc: AngularFirestoreDocument<scenario>;

    constructor(public afs: AngularFirestore) {
        //this.items = this.afs.collection('items').valueChanges();

        this.scenarioCollection = this.afs.collection('Scenario', ref => ref.orderBy('date', 'desc'));

        this.scenario = this.scenarioCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as scenario;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.scenarioCollection.valueChanges();
    }

    add(scenario: scenario) {
        this.scenarioCollection.add(scenario);
    }

    delete(scenario: scenario) {
        this.scenarioDoc = this.afs.doc(`scenario/${scenario.id}`);
        this.scenarioDoc.delete();
    }

    update(scenario: scenario) {
        this.scenarioDoc = this.afs.doc(`scenario/${scenario.id}`);
        this.scenarioDoc.update(scenario);
    }
}
