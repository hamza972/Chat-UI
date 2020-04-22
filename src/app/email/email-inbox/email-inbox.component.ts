import { Component, OnInit, Input } from "@angular/core";
import { Email } from "../../models/email";
import { EmailService } from "../../services/email.service";
import { appUser as User } from "../../models/user";

@Component({
  selector: "app-email-inbox",
  templateUrl: "./email-inbox.component.html",
  styleUrls: ["./email-inbox.component.scss"],
})
export class EmailInboxComponent implements OnInit {
  emails: Email[];
  @Input() user: User;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.inbox(this.user).subscribe((emails) => {
      this.emails = emails;
    });
  }
}
