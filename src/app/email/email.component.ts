import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/user';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  user: AppUser;
  tabstatus = {};

  constructor(private auth: LoginService, private router: Router) {}

  ngOnInit() {
    this.auth.getUserCurrent().subscribe((user) => {
      this.user = user;
    });
  }

  setTab(event): void {
    localStorage.setItem('tab', event.nextId);
  }
}
