import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appUser } from '../../models/user';

@Component({
  selector: 'app-roleProfile3',
  templateUrl: './roleProfile3.component.html',
  styleUrls: ['./roleProfile3.component.scss']
})
export class roleProfile3Component implements OnInit {
  
  user$: Observable<appUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}