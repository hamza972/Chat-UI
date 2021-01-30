import { Component, OnInit, Input } from '@angular/core';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { ParticipantService } from '../../services/participant.service';
import { Observable } from 'rxjs';
import { AppUser as User } from '../../models/user';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Email } from 'src/app/models/email';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss'],
})


export class EmailComposeComponent implements OnInit {
  emailform = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })
  
  get email(){return this.emailform.get('email')}
  
  
  
  public Editor = Editor;
  editorConfig = {
    toolbar: {
      items: [
        'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
        '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'undo', 'redo',]
    },
    image: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageTextAlternative'],
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'],
    },
    language: 'en'
  };
  participants: string[];
  @Input() user: User;
  newEmail: Email;
  emailForm: FormGroup;

  constructor(
    private participantService: ParticipantService,
    private emailService: EmailService,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      sendTo: [null, Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      subject: [null, Validators.required],
      body: [null, Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.participantService.get().subscribe((participants) => {
      this.participants = participants.map((participant) => participant.email);
    });
  }

  searchUsers = (search$: Observable<string>) =>
    search$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((query) =>
        query.length < 2
          ? []
          : this.participants
            .filter(
              (participant) =>
                participant.toLowerCase().indexOf(query.toLowerCase()) > -1
            )
            .slice(0, 10)
      )
    )

    send(formdata) {
    this.newEmail = {
      subject: formdata.subject,
      body: formdata.body,
      to: {
        user: formdata.sendTo,
      },
      from: {
        user: this.user.email,
      },
    };
    this.emailForm.reset();
    this.emailService.sendEmail(this.newEmail);
    alert('Your Email has been sent!!');
  }

  draft(formdata) {
    this.newEmail = {
      subject: formdata.subject,
      body: formdata.body,
      to: {
        user: formdata.sendTo || ' ',
      },
      from: {
        user: this.user.email,
      },
    };
    this.emailService.draftEmail(this.newEmail);
    console.log('drafting');
    alert('Your Email has been been moved to the drafts!!');
    this.emailForm.reset();
  }
}
