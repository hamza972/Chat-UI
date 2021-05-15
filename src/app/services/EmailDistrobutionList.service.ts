import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EmailDistributionLists } from '../models/email-distrobution';
import { LoginService } from '../auth/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class EmailDistributionService {
  DistroLists: Observable<EmailDistributionLists[]>;
  EmailDistributionCollection: AngularFirestoreCollection<EmailDistributionLists>;
  DistroEmailDoc: AngularFirestoreDocument<EmailDistributionLists>;


  constructor(
    public afs: AngularFirestore,
    public auth: LoginService,
    private db: AngularFirestore,
    private roleService: RoleService
  ) {}

    Get(){ //Sean Get entire list of every
      this.EmailDistributionCollection = this.afs.collection('EmailDistrobutionLists')
        return this.DistroLists = this.EmailDistributionCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as EmailDistributionLists;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    Add(newlist: EmailDistributionLists): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
      this.roleService.AppendEmailList(newlist.email);
      this.EmailDistributionCollection = this.afs.collection('EmailDistrobutionLists')
      var promise: Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> = this.EmailDistributionCollection.add(newlist);
      return(promise);
    }

    Update(DistroList: EmailDistributionLists): Promise<void>{ //Sean: New method to update existing emails
      this.DistroEmailDoc = this.afs.doc(`EmailDistrobutionLists/${DistroList.id}`);
        return(this.DistroEmailDoc.update(DistroList)); //Sean: Returns Promise
    } 
    Delete(DistroList: EmailDistributionLists): Promise<void>{
      this.DistroEmailDoc = this.afs.doc(`EmailDistrobutionLists/${DistroList.id}`);
      return(this.DistroEmailDoc.delete()); //Sean: Returns Promise
    }
}