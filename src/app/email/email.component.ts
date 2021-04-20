import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { NgbTab, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { LoginService } from "../auth/login.service";
import { AppUser as User } from "../models/user";
import { Email } from '../models/email';
import { AuthService } from './../services/auth.service';


@Component({
  selector: "app-email",
  templateUrl: "./email.component.html",
  styleUrls: ["./email.component.scss"],
  
})
export class EmailComponent implements OnInit {
  OptionalDraftEmail: Email;
  user: User;
  tabstatus = {};
  @ViewChild('tabsystem', {static: false}) tabsystem: NgbTabset;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserData().subscribe((user) => {
      this.user = user[0];
      localStorage.setItem("tab", "inbox");
    });
  }
  setTab(event): void {
    localStorage.setItem("tab", event.nextId);
  }
  setTabEvent(tab: string): void{ //this method is called when an event called 'switch-tab' is called from a child component
    this.tabsystem.select(tab); //this uses the 'tab-system' View-child which is a NgbTabset object to change the current active tab.
  }
  sendtocompose(email: Email)
  {
    this.OptionalDraftEmail = email;
    this.tabsystem.select('compose');
  }
  ClearDraft(): void {
    console.log(this.OptionalDraftEmail)
    this.OptionalDraftEmail = null;
    console.log("Clearing draft")
  }
}
