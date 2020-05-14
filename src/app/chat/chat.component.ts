import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user$: Observable<appUser>;

constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
    
  }

  
 

}
