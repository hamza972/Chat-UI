import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Scenario } from '../models/scenario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScenarioService {

    scenarioCollection: AngularFirestoreCollection<Scenario>;
    scenario: Observable<Scenario[]>;
    scenarioDoc: AngularFirestoreDocument<Scenario>;

    constructor(public afs: AngularFirestore) {
        this.scenarioCollection = this.afs.collection('Scenario', ref => ref.orderBy('date', 'desc'));

        this.scenario = this.scenarioCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Scenario;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.scenarioCollection.valueChanges();
    }

    add(scenario: Scenario) {
        this.scenarioCollection.add(scenario);
    }

    delete(scenario: Scenario) {
        this.scenarioDoc = this.afs.doc(`scenario/${scenario.id}`);
        this.scenarioDoc.delete();
    }

    update(scenario: Scenario) {
        this.scenarioDoc = this.afs.doc(`scenario/${scenario.id}`);
        this.scenarioDoc.update(scenario);
    }
}
