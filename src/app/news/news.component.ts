import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { News } from '../models/news';
import { Participant } from '../models/participant';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  user: firebase.User;
  newUserNews: News;
  newsUser: AppUser;
  userID: string;
  user$: Observable<AppUser>;
  newsArray: News[];
  sortedArray: News[];
  authError: any;
  searchText: string;
  user2: Participant = { roleTitle: ''};

  constructor(
    private auth: LoginService,
    private auth2: AuthService,
    private router: Router) { }

  ngOnInit() {
      /* Check if user is signed in, otherwise redirect to home */
      this.auth2.getUserData().subscribe(user => {
          if (user === null) {
              this.router.navigate(['/home']);
          } else {
              this.user2 = user[0];
              console.log(user[0]);
              console.log(user[0]);
              console.log(user[0]);
              console.log(this.user2);
          }
      });
      this.user$ = this.auth.user$;
      this.auth.getNews().subscribe(news => { this.newsArray = news; });
      this.user$ = this.auth.user$;
      this.user$.subscribe(userT => {
      console.log(userT);
      this.newsUser = userT;
    });
  }


  createNews(frm, frm2) {
    console.log(frm.value);
    this.newUserNews = {
      userName: this.newsUser.firstName + ' ' + this.newsUser.lastName,
      newsDate: new Date(), newsDescription: frm.value,
      newsHeadline: frm2.value,
      userEmail: this.newsUser.email,
      userRole: this.newsUser.role
    };
    this.auth.sendNewsData(this.newUserNews);
  }

  btnClick = function() {
    this.router.navigateByUrl('/news-publish');
  };

}
