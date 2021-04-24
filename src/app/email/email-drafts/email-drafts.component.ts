import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../../models/email';
import { EmailService } from '../../services/email.service';
import { AppUser } from '../../models/user';

@Component({
  selector: 'app-email-drafts',
  templateUrl: './email-drafts.component.html',
  styleUrls: ['./email-drafts.component.scss'],
})
export class EmailDraftsComponent implements OnInit {
  emails: Email[];
  @Input() user: AppUser;
  @Output() ComposeToDraftRelay = new EventEmitter<Email>(); //SEAN: Creates and allows the 'SendEmailToCompose' event to be relayed through this component, back

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.drafts(this.user).subscribe((emails) => {
      this.emails = emails;
    });
  }
  RelayEvent(email: Email) //Sean: transfer email back to compose via events, relay through this component
  {
    console.log("Sending Email Back to Compose. Relay through parent component");
    this.ComposeToDraftRelay.emit(email);  //Sean: Relay the event through
    console.log(email);
  }
}
