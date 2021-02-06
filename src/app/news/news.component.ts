import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { News } from '../models/News';
import { Participant } from '../models/participant';
import { AuthService } from '../services/auth.service';
import * as Editor from '../../assets/custom-ckeditor/ckeditor';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public Editor = Editor;
  user: firebase.User;
  newUserNews: News;
  newsUser: AppUser;
  userID: string;
  user$: Observable<AppUser>;
  newsArray: News[];
  sortedArray: News[];
  authError: any;
  searchText: string;
  user2: Participant = { systemRole: '' };
  editorConfig = {
    toolbar: {
      items: [
        'heading', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
        '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'undo', 'redo',]
    },
    image: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageTextAlternative'],
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'],
    },
    language: 'en'
  };

  constructor(
    private auth: LoginService,
    private auth2: AuthService,
    private router: Router ) { }

  ngOnInit() {
    /* Check if user is signed in, otherwise redirect to home */
    this.auth2.getUserData().subscribe(user => {
      if (user === null) {
        this.router.navigate(['/home']);
      } else {
        this.user2 = user[0];
      }
    });

    this.user$ = this.auth.user$;
    this.auth.getNews().subscribe(dbNews => { this.newsArray = dbNews; });

    this.user$ = this.auth.user$;
    this.user$.subscribe(userT => {
      console.log(userT);
      this.newsUser = userT;
    });
  }


  createNews(frm, frm2) {
    this.newUserNews = {
      userName: this.newsUser.firstName + ' ' + this.newsUser.lastName,
      newsDate: new Date(),
      newsDescription: frm.value,
      newsHeadline: frm2.value,
      userEmail: this.newsUser.email,
      userRole: this.newsUser.role };
  }

  btnClick = function() {
    this.router.navigateByUrl('/news-publish');
  };

}
