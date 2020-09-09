import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';

declare var  myLabel: any;
@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  
  user$: Observable<appUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;

     console.log("aaa");
     myLabel();

  }

  ngOnDestroy(){
    console.log("leave");
    let aaa=document.querySelectorAll('.note-container');
    console.log(aaa.length);

    if(aaa.length>0){
      for(let i=0;i<aaa.length;i++){
         document.body.removeChild(aaa[i]);
      }
    }
  }

}

