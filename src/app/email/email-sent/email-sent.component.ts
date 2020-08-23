import { Component, OnInit, Input } from "@angular/core";
import { Email } from "../../models/email";
import { EmailService } from "../../services/email.service";
import { appUser as User } from "../../models/user";

@Component({
  selector: "app-email-sent",
  templateUrl: "./email-sent.component.html",
  styleUrls: ["./email-sent.component.scss"],
})
export class EmailSentComponent implements OnInit {
  emails: Email[];
  @Input() user: User;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.sent(this.user).subscribe((emails) => {
      this.emails = emails;
    });
    console.log(this.emails);
  }
}
