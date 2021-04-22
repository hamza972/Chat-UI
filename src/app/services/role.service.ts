import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    roleCollection: AngularFirestoreCollection<Role>;
    roles: Observable<Role[]>;
    roleDoc: AngularFirestoreDocument<Role>;

    constructor(public afs: AngularFirestore) {
        this.roleCollection = this.afs.collection('Roles', ref => ref.orderBy('firstName', 'asc'));
    }

    get() {
        return this.roles = this.roleCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Role;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    getRole(id: string) {
        return this.afs.collection('Roles').doc(id).valueChanges();
    }

    add(role: Role) {
        console.log('role service', role);
        this.roleCollection.add(role).then(doc => {
            role.id = doc.id;
            this.update(role);
        });
    }

    delete(role: Role) {
        this.roleCollection.doc(role.id).delete();
    }

    //update(role: Role) {
      //  this.roleCollection.doc(role.id).update(role);
    //}
    update(role: Role): Promise<void>{ //Sean: New method to update existing emails
        var currentrole = this.afs.doc(`Roles/${role.id}`);
          return(currentrole.update(role)); //Sean: Returns Promise
      } 

    Equals(role1: Role, role2: Role):boolean {
        if(role1.avatar != role2.avatar){
            return false
        }
        if(role1.firstName != role2.firstName){
            return false
        }
        if(role1.description != role2.description){
            return false
        }
        if(role1.email != role2.email ){
            return false
        }
        if(role1.lastName!= role2.lastName ){
            return false
        }
        if(role1.email != role2.email ){
            return false
        }
        if(role1.twitterHandle != role2.twitterHandle ){
            return false
        }
        if(role1.twitterHandle != role2.twitterHandle ){
            return false
        }
        if(role1.title != role2.title ){
            return false
        }
        console.log("returning true")
        return(true);
    }

    return() {
        return this.roles;
    }
}
