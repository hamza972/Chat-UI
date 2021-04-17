import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AppUser } from '../models/user';

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
                    return this.db.collection('Users',
                    (ref) => ref.where('email', '==', user.email))
                    .snapshotChanges().pipe(map(changes => {
                        return changes.map(a => {
                            const data = a.payload.doc.data() as AppUser;
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
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(userCredential => {
            this.newUser = user;
            userCredential.user.updateProfile({displayName: user.firstName});
            this.insertUserData(userCredential);
        })
        .catch(error => {
            throw(error);
        });
    }

    insertUserData(userCredential: firebase.auth.UserCredential) {
        switch (this.newUser.systemRole) {
            case 'admin': {
                return this.db.doc('Users/' + userCredential.user.uid).set({
                    id: userCredential.user.uid,
                    email: this.newUser.email,
                    firstName: this.newUser.firstName,
                    lastName: this.newUser.lastName,
                    role: this.newUser.role,
                    systemRole: this.newUser.systemRole,
                });
            }
            case 'participant': {
                return this.db.doc('Users/' + userCredential.user.uid).set({
                    id: userCredential.user.uid,
                    email: this.newUser.email,
                    firstName: this.newUser.firstName,
                    lastName: this.newUser.lastName,
                    systemRole: this.newUser.systemRole,
                    role: this.newUser.role,
                });
            }
        }
    }

    login(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.eventAuthError.next(error);
            })
            .then(userCredential => {
                if (userCredential) {
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
