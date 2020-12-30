import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Scenario } from '../models/scenario';
import { Participant } from '../models/participant';
import { ScenarioService } from '../services/scenario.service';
import { AuthService } from '../services/auth.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})

export class ScenarioComponent implements OnInit {

  scenario: Scenario = { content: '' };
  scenarios: Scenario[];
  user: Participant = { roleTitle: ''};
  authError: any;

  constructor(
      private auth: AuthService,
      private scenarioService: ScenarioService,
      private router: Router
  ) {}

  ngOnInit() {
      /* Check if user is signed in, otherwise redirect to home */
      this.auth.getUserData().subscribe(user => {
          if (user === null) {
              this.router.navigate(['/home']);
          } else {
              this.user = user[0];
              console.log('this.user');
              console.log(this.user);
            }
        });

      this.scenarioService.get().subscribe(scenario => {
          this.scenarios = scenario;
      });

  }

  /* go to profile page */
  /*profile($event, scenario: scenario) {
      this.router.navigate(['/profile/'+scenario.roleID]);
  }
*/
  cancel() {
      this.router.navigate(['/scenario']);
  }

  add(frm: NgForm) {
      if (this.scenario.content !== '') {

          this.scenario = {
              date: new Date(),
              content: this.scenario.content,
          };
          this.scenarioService.add(this.scenario);
          alert('Your Email has been sent!!');
          frm.reset();
      }
  }

}
