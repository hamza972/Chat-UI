import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Participant } from '../models/participant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private eventAuthError = new BehaviorSubject<string>('');
    eventAuthError$ = this.eventAuthError.asObservable();
    newUser: any;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router
    ) { }

    getUserData() {
        return this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {

                    return this.db.collection(
                        'Users', (ref) => ref.where(
                            'email', '==', user.email)).snapshotChanges().pipe(map(changes => {
                                return changes.map(a => {
                                    const data = a.payload.doc.data() as Participant;
                                    data.id = a.payload.doc.id;
                                    return data;
                                });
                            }));
                } else {
                    return of(null);
                }
            })
        );
    }

    createUser(user) {
        this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(userCredential => {
            this.newUser = user;

            userCredential.user.updateProfile({displayName: user.firstName});

            this.insertUserData(userCredential).then(() => {
                this.router.navigate(['/home']);
            });
        })
        .catch(error => {
            this.eventAuthError.next(error);
        });
    }

    insertUserData(userCredential: firebase.auth.UserCredential) {
        return this.db.doc(`Users/${userCredential.user.uid}`).set({
            email: this.newUser.email,
            firstName: this.newUser.firstName,
            lastName: this.newUser.lastName,
            systemRole: this.newUser.systemRole,
            role: this.newUser.role,
            roleID: this.newUser.roleID,
            roleFirstName: this.newUser.roleFirstName,
            roleLastName: this.newUser.roleLastName,
            roleTitle: this.newUser.roleTitle,
            roleAffiliation: this.newUser.roleAffiliation
        });
    }

    login(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            this.eventAuthError.next(error);
        })
        .then(userCredential => {
            if(userCredential) {
                this.router.navigate(['/home']);
            }

        });
    }

    logout() {
        this.router.navigate(['/home']);
        window.location.reload();
        return this.afAuth.auth.signOut();
    }
}
