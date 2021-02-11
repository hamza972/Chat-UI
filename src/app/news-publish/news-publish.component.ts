import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-publish',
  templateUrl: './news-publish.component.html',
  styleUrls: ['./news-publish.component.scss']
})
export class NewsPublishComponent implements OnInit {
  search: any;
  recipient: any;
  subject: any;

  user: Observable<AppUser>;
  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    /* Check if user is signed in, otherwise redirect to home */
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
        this.router.navigate(['/home']);
      } else {
        this.user = user[0];
      }
    });
  }

  btnClickBack = function () {
    this.router.navigateByUrl('/news');
  };
}
