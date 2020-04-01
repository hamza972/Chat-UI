import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: firebase.User;

  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getUserCurrent()
      .subscribe( user => {
        this.user = user;
      })
  }



  login() {
    this.router.navigate(['/login']);
  }

  registration() {
    this.router.navigate(['/registration']);
  }
}
