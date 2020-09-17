import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appUser } from '../../models/user';

@Component({
  selector: 'app-roleProfile9',
  templateUrl: './roleProfile9.component.html',
  styleUrls: ['./roleProfile9.component.scss']
})
export class roleProfile9Component implements OnInit {
  
  user$: Observable<appUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}