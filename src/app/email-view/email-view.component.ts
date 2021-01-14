import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
    search: any;
    recipient: any;
    subject: any;

  user$: Observable<AppUser>;
  constructor(private auth: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}
