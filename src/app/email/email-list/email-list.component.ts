import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Email } from "../../models/email";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { EmailService } from "../../services/email.service";

@Component({
  selector: "app-email-list",
  templateUrl: "./email-list.component.html",
  styleUrls: ["./email-list.component.scss"],
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[];
  emails$: Observable<Email[]>;
  filter = new FormControl("");

  constructor(private emailService: EmailService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.emails !== undefined) {
      this.emails$ = this.filter.valueChanges.pipe(
        startWith(""),
        map((query) => this.search(query))
      );
    }
  }

  search(text: string): Email[] {
    return this.emails.filter((email) => {
      const term = text.toLowerCase();
      return (
        email.subject.toLowerCase().includes(term) ||
        email.from.user.toLowerCase().includes(term) ||
        email.body.toLowerCase().includes(term)
      );
    });
  }

  getTab() {
    return localStorage.getItem("tab");
  }

  delete(email: Email) {
    if (this.getTab() === "inbox") {
      email.to.deleted = true;
      this.emailService.delete(email);
    }

    if (this.getTab() === "send") {
      email.from.deleted = true;
      this.emailService.delete(email);
    }

    if (this.getTab() === "draft") {
      this.emailService.hardDelete(email);
    }

    if (this.getTab() === "delete") {
      this.emailService.hardDelete(email);
    }
  }

  cleanHtml(str: String) {
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  filterDeletePageSendReceive(from: String) {
    if (from == localStorage.getItem("userEmail")) {
      return "me";
    }
    return from;
  }
}
