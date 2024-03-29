import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../models/email';
import { EmailService } from '../../services/email.service';
import { AppUser as User } from '../../models/user';

@Component({
  selector: 'app-email-deleted',
  templateUrl: './email-deleted.component.html',
  styleUrls: ['./email-deleted.component.scss'],
})
export class EmailDeletedComponent implements OnInit {
  emails: Email[];
  @Input() user: User;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.deleted(this.user).subscribe(([inbox, sent]) => {
      this.emails = inbox.concat(sent);
    });
    console.log(this.user);
  }
}
