import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Email } from "../../models/email";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-email-list",
  templateUrl: "./email-list.component.html",
  styleUrls: ["./email-list.component.scss"],
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[];
  emails$: Observable<Email[]>;
  filter = new FormControl("");

  constructor() {}

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
}
