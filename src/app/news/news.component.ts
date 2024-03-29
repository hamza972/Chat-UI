import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { News } from '../models/News';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/user';
import * as Editor from '../../assets/custom-ckeditor/ckeditor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public Editor = Editor;
  user: AppUser;
  newsItems: News[];
  newsItemEntry: News;
  authError: any;
  searchText: string;
  editorConfig = {
    height: 200,
    toolbar: {
      items: [
        'heading', 'fontFamily', 'fontSize', 'fontColor', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'link', 'bulletedList', 'numberedList', '|',
        'alignment', 'indent', 'outdent', '|',
        'blockQuote', 'imageUpload', 'insertTable', 'mediaEmbed', 'undo', 'redo']
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
    private auth: AuthService,
    private newsService: NewsService,
    private router: Router,
    private modalService: NgbModal) { }


  ngOnInit() {
    /* Check if user is signed in, otherwise redirect to home */
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
        this.router.navigate(['/home']);
      } else {
        this.user = user[0];
      }
    });

    this.newsService.get().subscribe(news => {
      this.newsItems = news;
    });
  }


  createNews(frm, frm2, content) {
    this.newsItemEntry = {
      userName: this.user.firstName + ' ' + this.user.lastName,
      newsDate: new Date(),
      newsDescription: frm.value,
      newsHeadline: frm2.value,
      userEmail: this.user.email,
      userRole: this.user.firstName,
    };
    this.newsService.add(this.newsItemEntry);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });
  }

}
