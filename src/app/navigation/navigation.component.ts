import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { appUser } from '../models/user';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { stringify } from 'querystring';
import { UserInfo } from 'firebase';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user$: Observable<appUser>;

appTitle: string = 'MEPS';
user: firebase.User;

  constructor(private auth: LoginService,
    private router: Router) { 
      
      
    }

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.auth.getUserCurrent()
      .subscribe( user => {
        this.user = user;
      })
  }
  



  logout() {
    this.auth.logout();
  }
}
