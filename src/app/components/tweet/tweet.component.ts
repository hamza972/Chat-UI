import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';
import { Participant } from '../../models/participant';
import { TweetService } from '../../services/tweet.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

    tweet: Tweet = { content: "" };
    tweets: Tweet[];
    user: Participant = { rolePosition: ""};
    authError: any;

    constructor(
        private auth: AuthService,
        private tweetService: TweetService,
        private router: Router
    ) {}

    ngOnInit() {

        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                console.log("this.user");
                console.log(this.user);
            }
        })

        this.tweetService.get().subscribe(tweet => {
            this.tweets = tweet;
        });

    }

    /* go to profile page */
    profile($event, tweet: Tweet) {
        this.router.navigate(['/profile/'+tweet.roleID]);
    }

    cancel() {
        this.router.navigate(['/tweet']);
    }

    add() {
        if(this.tweet.content != '') {

            this.tweet = {

                date: new Date(),
                content: this.tweet.content,

                /* Properties are from User model,
                if possible to retrieve data using ID,
                no need to include this */
                userID: this.user.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                systemRole: this.user.systemRole,
                role: this.user.role,
                roleID: this.user.roleID,
                roleFirstName: this.user.roleFirstName,
                roleLastName: this.user.roleLastName,
                rolePosition: this.user.rolePosition,
                roleAffiliation: this.user.roleAffiliation,
                // profileImage: this.user.profileImage
            }

            console.log(this.tweet);

            this.tweetService.add(this.tweet);
            //this.router.navigate(['/control']);
        }
    }

}
