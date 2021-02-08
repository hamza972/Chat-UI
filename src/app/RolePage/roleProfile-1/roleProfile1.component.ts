import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from '../..//models/user';

@Component({
  selector: 'app-roleProfile1',
  templateUrl: './roleProfile1.component.html',
  styleUrls: ['./roleProfile1.component.scss']
})
export class roleProfile1Component implements OnInit {
  
  user$: Observable<AppUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}