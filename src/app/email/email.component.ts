import { Component, OnInit } from "@angular/core";
import { LoginService } from "../auth/login.service";
import { AppUser as User } from "../models/user";

@Component({
  selector: "app-email",
  templateUrl: "./email.component.html",
  styleUrls: ["./email.component.scss"],
})
export class EmailComponent implements OnInit {
  user: User;
  tabstatus = {};

  constructor(private auth: LoginService) {}

  ngOnInit() {
    this.auth.getUserCurrent().subscribe((user) => {
      this.user = user;
    });
  }

  setTab(event): void {
    localStorage.setItem("tab", event.nextId);
  }
}