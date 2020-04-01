import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { appUser } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  user$: Observable<appUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}
