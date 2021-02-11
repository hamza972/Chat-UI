import { Component, OnInit, Input } from '@angular/core';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/user';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Email } from 'src/app/models/email';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss'],
})
export class EmailComposeComponent implements OnInit {
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
  @Input() user: AppUser;
  newEmail: Email;
  emailForm: FormGroup;

  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      sendTo: [null, Validators.required],
      subject: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.get().subscribe((participants) => {
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
    );

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
    console.log('sending');
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