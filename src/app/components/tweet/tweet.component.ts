import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { AppUser } from '../../models/user';
import { RoleService } from '../../services/role.service';
import { TweetService } from '../../services/tweet.service';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TweetComponent implements OnInit {
    tweet: Tweet = { content: '' };
    tweets: Tweet[];
    user: AppUser = { systemRole: '' };
    userRole: Role;
    authError: any;
    hashtagRegEx = new RegExp(/\#.+?\s|\#.+?$/, 'g');

    public Editor = Editor;
    editorConfig = {
        toolbar: {
          items: [
            'link', 'bulletedList', 'numberedList', '|',
            'indent', 'outdent', '|',
            'blockQuote', 'imageUpload', 'insertTable', 'mediaEmbed', 'undo', 'redo']
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
        private router: Router,
        private modalService: NgbModal
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

    hashtags(content) {
        return '<span class="BlueColor">'+content+'</span>'
    }

    add(content) {
        if (this.tweet.content !== '' && this.tweet.content.length < 280) {
            
            this.tweet.content = this.tweet.content.replace(this.hashtagRegEx, this.hashtags);
            this.tweet.hashtag = this.tweet.content.match(this.hashtagRegEx),

            this.tweet = {
                date: new Date(),
                content: this.tweet.content,
                hashtag: this.tweet.hashtag,

                /* Properties are from User model,
                if possible to retrieve data using ID,
                no need to include this */
                userID: this.user.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                systemRole: this.user.systemRole,
                roleID: this.user.roleID,
                roleFirstName: this.user.roleFirstName,
                roleLastName: this.user.roleLastName,
                roleTitle: this.user.roleTitle,
                roleAffiliation: this.user.roleAffiliation,
                // roleAvatar: this.userRole.avatar
            };
            console.log(this.tweet.hashtag);
            this.tweetService.add(this.tweet);
            //this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });
            this.tweet.content = '';
        } 
        else {
            alert('Tweet error');
            //this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });
        }
    }
}
