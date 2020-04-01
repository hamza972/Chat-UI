import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { country } from '../models/country';

@Component({
  selector: 'app-countrytool',
  templateUrl: './countrytool.component.html',
  styleUrls: ['./countrytool.component.scss']
})
export class CountrytoolComponent implements OnInit {

  constructor(private auth: LoginService) { }

  ngOnInit() {
  }

  createCountry(frm) { 
    console.log(frm.value);
    this.auth.sendCountryData(frm.value);
  }
}
