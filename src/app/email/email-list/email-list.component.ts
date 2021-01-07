import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Email } from "../../models/email";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { EmailService } from "../../services/email.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-email-list",
  templateUrl: "./email-list.component.html",
  styleUrls: ["./email-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[];
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
          this.emailService.delete(email);
        }
    
        if (this.getTab() === "draft") {
          this.emailService.hardDelete(email);
        }
    
        if (this.getTab() === "delete") {
          this.emailService.hardDelete(email);
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
}
