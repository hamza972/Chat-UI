import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import {newsClass} from '../models/newsClass';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  user: firebase.User;
  newUserNews: newsClass;
  newsUser: appUser;
  userID: string;
  user$: Observable<appUser>;
  newsArray: newsClass[];
  sortedArray: newsClass[];
  authError: any;
  searchText: string;
  //search;

  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.auth.getNews().subscribe(news => {this.newsArray = news});

    this.user$ = this.auth.user$;
    this.user$.subscribe(userT => {
      console.log(userT);
      this.newsUser = userT;
    });

   // console.log(this.searchNews(" "))
  }


  createNews(frm, frm2) {
    console.log(frm.value);
    this.newUserNews = {userName: this.newsUser.firstName + ' ' + this.newsUser.lastName, newsDate: new Date(), newsDescription: frm.value, newsHeadline: frm2.value, userEmail: this.newsUser.email, userRole: this.newsUser.role}
    this.auth.sendNewsData(this.newUserNews);
  }

  /*searchNews(key:string)
  {
    return this.newsArray.map(news => news.newsDescription.includes("first"))
  }*/

  btnClick= function () {
    this.router.navigateByUrl('/news-publish');
};

}
