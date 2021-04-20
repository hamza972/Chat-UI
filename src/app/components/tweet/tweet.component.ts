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
import { Notification } from '../../models/notification';
import { NotificationService } from 'src/app/services/notification.service';
//import { RSA_PKCS1_OAEP_PADDING } from 'constants';

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
    hashtagRegEx = new RegExp(/\#(.*?)(?=\s)|\#(.*?)(?=\<)|\#(.*?)$/, 'g');
    mentionRegEx = new RegExp(/\@(.*?)(?=\s)|\@(.*?)(?=\<)|\@(.*?)$/, 'g');
    roles: Role[];
    tweetError: string = null;
    removeHTML = new RegExp(/(<([^>]+)>)/, 'g');
    hashtagList: string[];
    tweetSearch: string;
    notification: Notification = {};


    public Editor = Editor;
    editorConfig = {
        toolbar: {
          items: [
            'link', '|',
            'imageUpload', 'mediaEmbed', 'undo', 'redo']
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
        private modalService: NgbModal,
        private notificationService: NotificationService,
    ) { }


    ngOnInit() {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                this.getRoleList();
                if (this.user.systemRole === 'participant') {
                    this.roleService.getRole(this.user.role.id).subscribe( role => {
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
        this.router.navigate(['/profile/' + tweet.user.id]);
    }

    cancel() {
        this.router.navigate(['/tweet']);
    }

    hashtagHTMLBuilder(content) {
        return '<span class="hashtag">'+content+'</span>'
    }

    hashtagSearch(hashtag) {

    }

    mentionHTMLBuilder(mention) {
        //var newMention = mention.substring(1);

        return '<a class="mention"; href="/profile/' + mention.id + '">@'+mention.twitterHandle+'</a>'
    }


    

    //gets a list of roles from the roleService
    getRoleList() {

        this.roleService.get().subscribe(dbRoles => {
            this.roles = dbRoles;
            //console.log(this.roles);
        });
    }

    mentionChecker(mention) {
        for (var i = 0; i < this.roles.length; i++){
            //takes off the @ symbol at the beginning of the mention
            var newMention = mention.substring(1);
            //compares the role id to the mention
            if (this.roles[i].twitterHandle == newMention) {
                return this.roles[i];
            } 
        }
        return undefined;
    }

    add(content) {
        if (this.tweet.content !== '' && this.tweet.content.length < 280) {
            //Create hashtag inside content
            this.tweet.content = this.tweet.content.replace(this.hashtagRegEx, this.hashtagHTMLBuilder);
            //Put hashtag into a list for reference
            this.tweet.hashtag = this.tweet.content.match(this.hashtagRegEx);

            //Put hashtag into a list for reference
            this.tweet.mention = this.tweet.content.match(this.mentionRegEx);

            if (this.tweet.mention !== null) {

                for (var i = 0; i < this.tweet.mention.length; i++){
                    var mentionRole = this.mentionChecker(this.tweet.mention[i]);

                    if (mentionRole !== undefined){
                        console.log(mentionRole);
                        this.notification.viewed = false;
                        this.notification.type = 'tweet';
                        this.notification.role = mentionRole;
                        this.notification = {
                            date: new Date(),
                            viewed: this.notification.viewed,
                            type: this.notification.type,
                            role: this.notification.role,
                        }
                        this.notificationService.add(this.notification);
                        this.tweet.content = this.tweet.content.replace(this.tweet.mention[i], this.mentionHTMLBuilder(mentionRole));
                    }
                    
                }
                
            }

            this.tweet = {
                date: new Date(),
                content: this.tweet.content,
                hashtag: this.tweet.hashtag,
                mention: this.tweet.mention,
                user: this.user,

            };
            //this.tweetService.add(this.tweet);
            this.tweet.content = '';
        } 
    }
}

