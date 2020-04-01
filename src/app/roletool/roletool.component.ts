import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { country } from '../models/country';

@Component({
  selector: 'app-roletool',
  templateUrl: './roletool.component.html',
  styleUrls: ['./roletool.component.scss']
})
export class RoletoolComponent implements OnInit {
  countryArray: country[];
  
  constructor(private auth: LoginService) { }

  ngOnInit() {
    this.auth.getCountries().subscribe(countries => {
      console.log(countries);
      this.countryArray = countries;
    });
  }

  createRole(frm) { 
    this.auth.sendRoleData(frm.value);
  }
}
