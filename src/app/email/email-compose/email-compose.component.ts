import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/user';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Email } from 'src/app/models/email';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { promise } from 'protractor';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss'],
})
export class EmailComposeComponent implements OnInit {
  @Output() switchtab = new EventEmitter<String>(); //SEAN: Creates and allows the 'switchtab' event to be sent to the parent component. 
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
      sendTo: [null, [Validators.required, 
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]], 
        //Feature lost in commit 4d21784e3f5, was added in earlier 1154066f603 credit to past student, MUHAMMAD ZORAIN ALI
        //original regex [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$ Current Version improved by Sean to permit capitals.
        //The backend will deal with capitals.
      subject: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.get().subscribe((participants) => {
      this.participants = participants.map((participant) => participant.email);
      console.log("Waiting for participants")
    });
    console.log("Participants have arrived")
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
        user: ((formdata.sendTo as string).toLowerCase().trim()) //SEAN: Set all to lower case and remove any leading or trailing whitespaces. 
        //SEAN: user no longer has to worry about capitals.
      },
      from: {
        user: this.user.email,
      },
    };
    //Sean's Email Promise implementation for checking withfire-base if the email was good or not
    var promise: Promise <firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
    promise = this.emailService.sendEmail(this.newEmail);
    //Sean's debugging stuff
    //console.log('sending')
    //console.log(formdata.subject)
    //console.log(this.user.email)
    //Sean: Actually checks if the results from firebase before informing the user if it was sucessful or not!
    promise.then(result => 
    {    
    alert('Your Email has been sent to ' + (formdata.sendTo as string).toLowerCase().trim() + ' , Press ok to continue'); //set email to a ll lower case and trim spaces out of it, 
    console.log('Sending Complete') //console debug
    this.emailForm.reset(); //SEAN: 26th of march, moved this down to after the email has been sent.
    //location.reload(); //This is no longer required, the switchtab event now handles moving the current tab back to the inbox. Its faster than reloading.
    this.switchtab.emit("inbox"); //emits the switchtab event which instructs the parent componenet to switch the current tab to the inbox
    });
    promise.catch(error => //Sean: this method will run if firebase reports a problem
      {    
      alert('Something has went wrong, the email was not sent, please try again');
      console.log('sending failed') //console debug
      });
  }

  draft(formdata) {
    //Sean: Actually checks if the results from firebase before informing the user if it was sucessful or not!
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
    var promise: Promise <firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
    promise = this.emailService.draftEmail(this.newEmail);
    console.log('drafting');
    promise.then(result => 
      {    
      alert('Your Email has been saved as a draft'); //set email to a ll lower case and trim spaces out of it, 
      console.log('Save as draft') //console debug
      this.emailForm.reset(); //SEAN: 26th of march, moved this down to after the email has been sent.
      this.switchtab.emit("draft");
      });
    alert('Your Email has been been moved to the drafts!!'); //Sean: Need to implement a promise here. Completed on the 26th of march 2021
    this.emailForm.reset();
    promise.catch(error => //Sean: this method will run if firebase reports a problem
      {    
      alert('Something has went wrong, the email was not saved, please try again');
      console.log('sending failed') //console debug
      });
  }
}
