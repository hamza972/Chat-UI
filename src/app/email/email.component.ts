import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { NgbTab, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { LoginService } from "../auth/login.service";
import { AppUser as User } from "../models/user";
import { Email } from '../models/email';


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

  constructor(private auth: LoginService) { }

  ngOnInit() {
    this.auth.getUserCurrent().subscribe((user) => {
      this.user = user;
      //console.log("User arrived"); //debug
    });
    //console.log("waiting for user"); //debug
  }
  setTab(event): void {
    console.log(event.nextId);
    localStorage.setItem("tab", event.nextId);
  }
  setTabEvent(tab: string): void{ //this method is called when an event called 'switchtab' is called from a child componenet
    this.tabsystem.select(tab); //this uses the 'tabsystem' Viewchild which is a NgbTabset object to change the current active tab.
  }
  sendtocompose(email: Email)
  {
    console.log("Got the email back from draft");
    this.OptionalDraftEmail = email;
    this.tabsystem.select('compose');
    console.log(email);
  }
}
