import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  
  user$: Observable<appUser>;
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

}
