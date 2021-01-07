import { Component, OnInit, Input } from "@angular/core";
import * as Editor from "@ckeditor/ckeditor5-build-classic";
import Base64Plugin from "./Base64Upload.js";
import { ParticipantService } from "../../services/participant.service";
import { Observable } from "rxjs";
import { appUser as User } from "../../models/user";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Email } from "src/app/models/email";
import { EmailService } from "../../services/email.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-email-compose",
  templateUrl: "./email-compose.component.html",
  styleUrls: ["./email-compose.component.scss"],
})
export class EmailComposeComponent implements OnInit {
  public Editor = Editor;
  editorConfig =  {extraPlugins: [Base64Plugin]};
  participants: string[];
  sendTo: string = "";
  subject: string = "";
  body: string = "";
  @Input() user: User;
  newEmail: Email;

  constructor(
    private participantService: ParticipantService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.participantService.get().subscribe((participants) => {
      this.participants = participants.map((participant) => participant.email);
    });
  }

  searchUsers = (search$: Observable<String>) =>
    search$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((query) =>
        query.length < 2
          ? []
          : this.participants
              .filter(
                (participant) =>
                  participant.toLowerCase().indexOf(query.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  send(frm: NgForm) {
    this.newEmail = {
      subject: this.subject,
      body: this.body,
      to: {
        user: this.sendTo,
      },
      from: {
        user: this.user.email,
      },
    };
    frm.reset();
    this.emailService.sendEmail(this.newEmail);
    console.log("sending");
    alert("Your Email has been sent!!");
    //var form = <HTMLInputElement>document.getElementById("Form").reset();
  }

  draft(frm: NgForm) {
    this.newEmail = {
      subject: this.subject,
      body: this.body,
      to: {
        user: this.sendTo || " ",
      },
      from: {
        user: this.user.email,
      },
    };
    this.emailService.draftEmail(this.newEmail);
    console.log("drafting");
    alert("Your Email has been been moved to the drafts!!");
    frm.reset();
  }
}
