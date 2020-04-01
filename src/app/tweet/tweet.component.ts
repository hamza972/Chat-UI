import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { tweetClass } from '../models/tweetClass';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  maxTweet = 280;
  
  user: firebase.User;
  newUserTweet: tweetClass;
  tweetUser: appUser;
  userID: string;
  user$: Observable<appUser>;
  tweetArray: tweetClass[];
  sortedArray: tweetClass[];

  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getTweets().subscribe(tweets => {
      this.tweetArray = tweets;
    });
    
    this.user$ = this.auth.user$;
    this.user$.subscribe(userT => {
      console.log(userT);
      this.tweetUser = userT;
    });
  }

  createTweet(frm) { 
    console.log(frm.value);
    this.newUserTweet = {userName: this.tweetUser.firstName + ' ' + this.tweetUser.lastName, tweetDate: new Date(), tweetDescription: frm.value, userEmail: this.tweetUser.email, userRole: this.tweetUser.role}
    this.auth.sendTweetData(this.newUserTweet);
  }

}

