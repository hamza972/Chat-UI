import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Scenario } from '../models/scenario';
import { Participant } from '../models/participant';
import { ScenarioService } from '../services/scenario.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import * as Editor from '../../assets/custom-ckeditor/ckeditor';

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})

export class ScenarioComponent implements OnInit {
    scenario: Scenario = { content: '' };
    scenarios: Scenario[];
    user: Participant;
    authError: any;
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
            }
        });

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
            };

            this.scenarioService.add(this.scenario);
            alert('Your Email has been sent!!');
            frm.reset();
        }
    }

}
