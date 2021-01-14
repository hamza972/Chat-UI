import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';

@Component({
  selector: 'app-RolePage',
  templateUrl: './RolePage.component.html',
  styleUrls: ['./RolePage.component.scss']
})
export class RolePageComponent implements OnInit {
  
  user$: Observable<AppUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}