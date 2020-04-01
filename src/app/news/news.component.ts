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

  user$: Observable<appUser>;
  newsArray: newsClass[];

  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.auth.getNews().subscribe(news => {this.newsArray = news});
  }

  btnClick= function () {
    this.router.navigateByUrl('/news-publish');
};

}
