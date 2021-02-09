import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { Participant } from '../../models/participant';
import { RoleService } from '../../services/role.service';
import { TweetService } from '../../services/tweet.service';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss']
})

export class TweetComponent implements OnInit {
    tweet: Tweet = { content: '' };
    tweets: Tweet[];
    user: Participant = { systemRole: '' };
    userRole: Role;
    authError: any;

    public Editor = Editor;
    editorConfig = {
        toolbar: {
          items: [
            'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
            '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'undo', 'redo' ]
        },
        image: {
          toolbar: [
            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight' ],
          styles: [
            'alignLeft', 'alignCenter', 'alignRight'],
        },
        language: 'en'
    };

    constructor(
        private auth: AuthService,
        private tweetService: TweetService,
        private roleService: RoleService,
        private router: Router
    ) { }


    ngOnInit() {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                if (this.user.systemRole === 'participant') {
                    this.roleService.getRole(this.user.roleID).subscribe( role => {
                        this.userRole = role;
                    });
                }
            }
        });

        this.tweetService.get().subscribe(tweet => {
            this.tweets = tweet;
        });

    }

    /* go to profile page */
    profile($event, tweet: Tweet) {
        this.router.navigate(['/profile/' + tweet.roleID]);
    }

    cancel() {
        this.router.navigate(['/tweet']);
    }

    add() {
        if (this.tweet.content !== '') {
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
                roleID: this.user.roleID,
                roleFirstName: this.userRole.firstName,
                roleLastName: this.userRole.lastName,
                roleTitle: this.userRole.title,
                roleAffiliation: this.userRole.affiliation,
                roleAvatar: this.userRole.avatar
            };
            this.tweetService.add(this.tweet);
        }
    }
}
