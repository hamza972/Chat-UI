import { Component, OnInit, Input } from "@angular/core";
import { Email } from "../../models/email";
import { EmailService } from "../../services/email.service";
import { appUser as User } from "../../models/user";

@Component({
  selector: "app-email-drafts",
  templateUrl: "./email-drafts.component.html",
  styleUrls: ["./email-drafts.component.scss"],
})
export class EmailDraftsComponent implements OnInit {
  emails: Email[];
  @Input() user: User;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.drafts(this.user).subscribe((emails) => {
      this.emails = emails;
    });
  }
}
