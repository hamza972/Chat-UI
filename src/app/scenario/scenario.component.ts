import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { scenario } from '../models/scenario';
import { Participant } from '../models/participant';
import { ScenarioService } from '../services/scenario.service';
import { AuthService } from '../services/auth.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';
<<<<<<< HEAD
<<<<<<< HEAD
import { Owner } from '../models/owner';

=======
import * as Editor from "@ckeditor/ckeditor5-build-classic";
import Base64Plugin from "../email/email-compose/Base64Upload.js";
>>>>>>> 69b228e254a76ef1e53082519cf4168aadcea4dc
=======
import * as Editor from '../../assets/custom-ckeditor/ckeditor';

>>>>>>> c91cefbdc44529f892c7fa51687b9d5f9955f768
@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})

export class ScenarioComponent implements OnInit {
<<<<<<< HEAD

  scenario: scenario = { content: "" };
  scenarios: scenario[];
  user: Owner = { rolePosition: "  "};
  authError: any;

  constructor(
      private auth: AuthService,
      private scenarioService: ScenarioService,
      private router: Router
  ) {}

  ngOnInit() {

      /* Check if user is signed in, otherwise redirect to home */
      this.auth.getUserData().subscribe(user => {
          if(user === null) {
              this.router.navigate(['/home']);
          } else {
              this.user = user[0];
              console.log("this.user");
              console.log(this.user);
          }
      })

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
      if(this.scenario.content != '') {

          this.scenario = {

              date: new Date(),
              content: this.scenario.content,
          }

          console.log(this.scenario);

          this.scenarioService.add(this.scenario);
          //this.router.navigate(['/control']);
          alert("Your Email has been sent!!");
          frm.reset();
      }

      console.log(this.scenario )
  }
=======
    public Editor = Editor;
    editorConfig = {
        toolbar: {
          items: [
            'heading', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
            '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'insertTable', 'undo', 'redo']
        },
        image: {
          toolbar: [
            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
            '|',
            'imageTextAlternative'],
          styles: [
            'alignLeft', 'alignCenter', 'alignRight'],
        },
        table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells']
        },
        language: 'en'
    };
    scenario: scenario = { content: '' };
    scenarios: scenario[];
    user: Participant = { rolePosition: '' };
    authError: any;

    constructor(
        private auth: AuthService,
        private scenarioService: ScenarioService,
        private router: Router
    ) { }

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
        })

        this.scenarioService.get().subscribe(dbScenarios => {
            this.scenarios = dbScenarios;
        });

    }

    cancel() {
        this.router.navigate(['/scenario']);
    }

    add(frm: NgForm) {
        if (this.scenario.content !== '') {

            this.scenario = {

                date: new Date(),
                content: this.scenario.content,
            }

            console.log(this.scenario);

            this.scenarioService.add(this.scenario);
            alert('Your Email has been sent!!');
            frm.reset();
        }
    }
>>>>>>> 69b228e254a76ef1e53082519cf4168aadcea4dc

}
