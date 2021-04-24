import { Component, OnInit, Input, Output ,ViewEncapsulation, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Email } from "../../models/email";
import { Observable } from "rxjs";
import { AppUser } from '../../models/user';
import { map, startWith } from "rxjs/operators";
import { EmailService } from "../../services/email.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '..//../services/role.service';

@Component({
  selector: "app-email-list",
  templateUrl: "./email-list.component.html",
  styleUrls: ["./email-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[];
  @Output() SendEmailToCompose = new EventEmitter<Email>(); //SEAN: Creates and allows the 'switch-tab' event to be sent to the parent component
  emails$: Observable<Email[]>;
  filter = new FormControl("");
  user: AppUser;
  IsUserAdmin: boolean;
  constructor(private sr: DomSanitizer, private emailService: EmailService, private modalService: NgbModal, private auth: AuthService) { }


  ngOnInit() {
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
          console.log("unable to find user")
      } else {
          this.user = user[0];
          if(this.user.systemRole == "admin"){
            this.IsUserAdmin = true;
          }   
      } 
  });
  }

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

  getAdminIsUser() {
    return(this.IsUserAdmin);
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
        if (this.getTab() === "draft") {
          this.emailService.delete(email);
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
    this.SendEmailToCompose.emit(email); 
  }
}
