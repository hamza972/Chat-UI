import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-publish',
  templateUrl: './news-publish.component.html',
  styleUrls: ['./news-publish.component.scss']
})
export class NewsPublishComponent implements OnInit {

    /* added by xander */
    search: any;
    recipient: any;
    subject: any;
    /* added by xander */

  user$: Observable<AppUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  btnClickBack= function () {
    this.router.navigateByUrl('/news');
};

}
