import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/user';

@Component({
  selector: 'app-roleProfile5',
  templateUrl: './roleProfile5.component.html',
  styleUrls: ['./roleProfile5.component.scss']
})
export class roleProfile5Component implements OnInit {
  
  user$: Observable<AppUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}