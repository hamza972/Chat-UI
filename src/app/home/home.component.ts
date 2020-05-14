import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';
import { TweetService } from './../services/tweet.service';
import { NewsService } from './../services/news.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    user: firebase.User;
    tweet: Tweet = { content: "" };
    tweets: Tweet[];

    news: News = { content: "" };
    newss: News[];

    constructor(
        private auth: AuthService,
        private tweetService: TweetService,
        private newsService: NewsService,
        private router: Router
    ) { }

    ngOnInit(): void {

        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
        })

        /* Retrieve latest tweets */
        this.tweetService.get().subscribe(tweet => {
            this.tweets = tweet;
        });

        /* Retrieve latest news */
        this.newsService.get().subscribe(news => {
            this.newss = news;
        });
    }

    login() {
        this.router.navigate(['/login']);
    }

    register() {
        console.log('here');
        this.router.navigate(['/registration']);
    }

    logout() {
        this.auth.logout();
    }
}
