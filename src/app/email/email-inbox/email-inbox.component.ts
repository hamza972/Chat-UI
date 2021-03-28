import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../models/email';
import { EmailService } from '../../services/email.service';
import { AppUser as User } from '../../models/user';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss'],
})
export class EmailInboxComponent implements OnInit {
  emails: Email[];
  @Input() user: User;

  constructor(private emailService: EmailService) {}

  ngOnInit() { //Sean: This almost never works, the 'user' doesn't load in fast enough, see below method 
    this.emailService.inbox(this.user).subscribe((emails) => {
      this.emails = emails;
    });
  }
  ngOnChanges() { //Sean: auto refresh the emails when new ones come in. Also helps with the issue with loading the 'user' when it becomes available
    this.emailService.inbox(this.user).subscribe((emails) => {
      this.emails = emails;
    });
    }   
}
