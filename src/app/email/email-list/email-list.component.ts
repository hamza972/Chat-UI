import { Component, OnInit, Input, Output ,ViewEncapsulation, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Email } from "../../models/email";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { EmailService } from "../../services/email.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-email-list",
  templateUrl: "./email-list.component.html",
  styleUrls: ["./email-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[];
  @Output() SendEmailToCompose = new EventEmitter<Email>(); //SEAN: Creates and allows the 'switchtab' event to be sent to the parent component
  emails$: Observable<Email[]>;
  filter = new FormControl("");
  constructor(private sr: DomSanitizer, private emailService: EmailService, private modalService: NgbModal) { }


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

  deleteEmail(email: Email, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      if (result) {
        if (this.getTab() === "inbox") {
          email.to.deleted = true;
          this.emailService.delete(email);
        }
        if (this.getTab() === "send") {
          email.from.deleted = true;
          console.log("Functionality removed, emails cannot be deleted");
        }
        if (this.getTab() === "draft") {
          this.emailService.delete(email);
        }
        if (this.getTab() === "delete") {
          //this.emailService.hardDelete(email);
          console.log("Functionality removed, emails cannot be deleted");
        }
      }
    });

  }

  cleanHtml(str: string) {
    return str;
  }

  public htmlProperty(str: string) : SafeHtml {

         return this.sr.bypassSecurityTrustHtml(str);
  }

  filterDeletePageSendReceive(from: string) {
    if (from == localStorage.getItem("userEmail")) {
      return "me";
    }
    return from;
  }

  TransferEmailToCompose(email: Email) //Sean: transfer email back to compose via events
  {
    console.log("Sending Email Back to Compose");
    this.SendEmailToCompose.emit(email); 
  }
}
