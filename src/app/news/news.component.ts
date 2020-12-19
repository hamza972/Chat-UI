import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { newsClass } from '../models/newsClass';
import { Participant } from '../models/participant';
import { AuthService } from '../services/auth.service';
import * as Editor from "@ckeditor/ckeditor5-build-classic";
import Base64Plugin from "../email/email-compose/Base64Upload.js";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public Editor = Editor;
  editorConfig = { extraPlugins: [Base64Plugin], placeholder: 'Enter news description', };
  user: firebase.User;
  newUserNews: newsClass;
  newsUser: appUser;
  userID: string;
  user$: Observable<appUser>;
  newsArray: newsClass[];
  sortedArray: newsClass[];
  authError: any;
  searchText: string;
  user2: Participant = { rolePosition: "" };
  //search;

  constructor(private auth: LoginService,
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
    })

    this.user$ = this.auth.user$;
    this.auth.getNews().subscribe(news => { this.newsArray = news });

    this.user$ = this.auth.user$;
    this.user$.subscribe(userT => {
      console.log(userT);
      this.newsUser = userT;
    });

    // console.log(this.searchNews(" "))
  }


  createNews(frm, frm2) {
    console.log(frm.value);
    this.newUserNews = { userName: this.newsUser.firstName + ' ' + this.newsUser.lastName, newsDate: new Date(), newsDescription: frm.value, newsHeadline: frm2.value, userEmail: this.newsUser.email, userRole: this.newsUser.role }
    console.log("this newa", this.newUserNews)
    // this.auth.sendNewsData(this.newUserNews);
  }

  /*searchNews(key:string)
  {
    return this.newsArray.map(news => news.newsDescription.includes("first"))
  }*/

  btnClick = function () {
    this.router.navigateByUrl('/news-publish');
  };

}
