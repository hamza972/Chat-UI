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
        this.router.navigate(['/profile/' + tweet.user.id]);
    }

    cancel() {
        this.router.navigate(['/tweet']);
    }

    hashtagHTMLBuilder(content) {
        return '<span class="hashtag">'+content+'</span>'
    }

    mentionHTMLBuilder(content) {
        return '<span class="mention"; [routerLink]="[\'/profile\', role.id]">'+content+'</span>'
    }

    mentionCheck(mention) {

        //Creates a list of roles
        var roles: Role[];
        var check = false;
        var newMention = String(mention.substring(1));

        this.roleService.get().subscribe(dbRoles => {
            roles = dbRoles;

            for (var i = 0; i < roles.length; i++){
                if(roles[i].id == newMention){
                    console.log(roles[i].id);
                    console.log(newMention);
                    check = true;
                }
            }
        
        });

        return check;
    }

    add(content) {
        if (this.tweet.content !== '' && this.tweet.content.length < 280) {
            
            //Create hashtag inside content
            this.tweet.content = this.tweet.content.replace(this.hashtagRegEx, this.hashtagHTMLBuilder);
            //Put hashtag into a list for reference
            this.tweet.hashtag = this.tweet.content.match(this.hashtagRegEx);

            //Put hashtag into a list for reference
            this.tweet.mention = this.tweet.content.match(this.mentionRegEx);

            for (var i = 0; i < this.tweet.mention.length; i++){
                var checkID = this.mentionCheck(this.tweet.mention[i]);
                console.log(checkID);

                if (checkID == true) {
                    console.log(true);
                    this.tweet.content = this.tweet.content.replace(this.mentionRegEx, this.mentionHTMLBuilder);
                } else{
                    
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
            //this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });
            this.tweet.content = '';
        } 
        else {
            alert('Tweet error');
            //this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });
        }
    }
}
