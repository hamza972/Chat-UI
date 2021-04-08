import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/user';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Email } from 'src/app/models/email';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
  @Input() OptionalDraftEmail: Email;
  IsDraft: Boolean;
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
      //console.log("Waiting for participants")
    });
    this.LoadAutoSave();
    setInterval(this.AutoSave, 3000, this.emailForm) //auto saves very 30 seconds.
    //console.log("Participants have arrived")
  }

  ngOnChanges() { //Sean: auto refreshes when a draft email becomes avalible and puts its into the form. 
  if (this.OptionalDraftEmail != null){
    this.IsDraft = true
    this.emailForm.patchValue({sendTo: this.OptionalDraftEmail.to.user});
    this.emailForm.patchValue({subject: this.OptionalDraftEmail.subject});
    this.emailForm.patchValue({body: this.OptionalDraftEmail.body});
    }
    else {
     //Sean: do nonthing?   
    }
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
     if(this.IsDraft == true) //sending existing draft emails
     {
      this.OptionalDraftEmail.to.user = ((formdata.sendTo as string).toLowerCase().trim()); //set new information 
      this.OptionalDraftEmail.subject = formdata.subject;
      this.OptionalDraftEmail.body = formdata.body;
      this.OptionalDraftEmail.draft = false;
      this.OptionalDraftEmail.to.deleted = false;
      this.OptionalDraftEmail.from.deleted = false;
      this.OptionalDraftEmail.from.user = this.user.email;
      this.emailService.update(this.OptionalDraftEmail); //This will update the email object in firebase, effectivly sending it, as the all fields should be correct to appear to the recipent mailbox.
      alert('Your Email has been sent to ' + (formdata.sendTo as string).toLowerCase().trim() + ' , Press ok to continue'); //set email to a ll lower case and trim spaces out of it, 
      console.log('Sending Draft Email Complete') //console debug
      this.ClearAllFields();; //SEAN: 26th of march, moved this down to after the email has been sent.
      this.switchtab.emit("inbox"); //emits the switchtab event which instructs the parent componenet to switch the current tab to the inbox
      this.IsDraft = false; //draft has been sent, switch back to normal new email
     }
     else { //sending normal new emails
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
    this.ClearAllFields(); //SEAN: 26th of march, moved this down to after the email has been sent.
    //location.reload(); //This is no longer required, the switchtab event now handles moving the current tab back to the inbox. Its faster than reloading.
    this.switchtab.emit("inbox"); //emits the switchtab event which instructs the parent componenet to switch the current tab to the inbox
    });
    promise.catch(error => //Sean: this method will run if firebase reports a problem
      {    
      alert('Something has went wrong, the email was not sent, please try again');
      console.log('sending failed') //console debug
      });
    }
  }

  AutoSave(emailForm: FormGroup){ //auto runs every 30 seconds, saves the current contents to browser cache
    console.log(emailForm);
    console.log("Autosave");
    var SubjectControl: AbstractControl; //get the individual controls for each input box
    var ToEmailControl: AbstractControl;
    var BodyControl: AbstractControl;
    SubjectControl = emailForm.get("subject"); //get inputs
    ToEmailControl = emailForm.get("sendTo");
    BodyControl = emailForm.get("body");
    console.log(ToEmailControl);
    //check input to ensure nonthing that is null is saved to the cache
      if (BodyControl.value != null) {
        localStorage.setItem("autosave-body", BodyControl.value)
      }
      if (SubjectControl.value != null) {
        localStorage.setItem("autosave-subject", SubjectControl.value)
      }
      if (ToEmailControl.value != null) {
        localStorage.setItem("autosave-to-user", ToEmailControl.value)
      }
  }
  ClearAllFields(){
    this.emailForm.reset(); 
    if(this.IsDraft == true) //if this 
    {
      this.IsDraft = false;
      this.emailForm.reset();
      this.OptionalDraftEmail = null; 
    }
    localStorage.removeItem("autosave-to-user"); //clearing the localstorage
    localStorage.removeItem("autosave-subject");
    localStorage.removeItem("autosave-body");
  }
  LoadAutoSave(){ //this gets called every time the page is refreshed
    var Body: string = localStorage.getItem("autosave-body")
    var toUser: string = localStorage.getItem("autosave-to-user");
    var subject: string = localStorage.getItem("autosave-subject");
      console.log("Loaded draft email from cache")
      if (Body != null) {
        this.emailForm.patchValue({body: Body});
      }
      if (toUser != null) {
        this.emailForm.patchValue({sendTo: toUser});
      }
      if (subject != null) {
        this.emailForm.patchValue({subject: subject});
      }
    else {
      console.log("Attempted to load email details from browser cache, nothing was found")
    }
  }
  draft(formdata) {
    if (formdata.subject == "" || formdata.subject == null) {
      alert("subject must not be empty") //Sean: EMAILS MUST HAVE A SUBJECT, or it will break the drafts section when the search functions throws an exception for missing subject.
      return
    }
    if(this.IsDraft == true) //sending existing draft emails back to drafts
    {
     this.OptionalDraftEmail.to.user = ((formdata.sendTo as string).toLowerCase().trim()); //set new information 
     this.OptionalDraftEmail.subject = formdata.subject;
     this.OptionalDraftEmail.body = formdata.body;
     this.OptionalDraftEmail.draft = true; //this sends it back to drafts instead of a proper send!
     this.OptionalDraftEmail.to.deleted = false;
     this.OptionalDraftEmail.from.deleted = false;
     this.OptionalDraftEmail.from.user = this.user.email;
     this.emailService.update(this.OptionalDraftEmail); //This will update the email object in firebase, effectivly sending it, as the all fields should be correct to appear to the recipent mailbox.
     alert('Your Email has been sent to back to drafts, Press ok to continue'); //set email to a ll lower case and trim spaces out of it, 
     console.log('Sending back to drafts complete') //console debug
     this.ClearAllFields(); //SEAN: 26th of march, moved this down to after the email has been sent.
     //location.reload(); //This is no longer required, the switchtab event now handles moving the current tab back to the inbox. Its faster than reloading.
     this.switchtab.emit("draft"); //emits the switchtab event which instructs the parent componenet to switch the current tab to the inbox
     this.IsDraft = false; //draft has been sent, switch back to normal new email
    }
    else { //sending new drafts to the draft section.
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
      this.ClearAllFields(); //SEAN: 26th of march, moved this down to after the email has been sent.
      this.switchtab.emit("draft");
      });
    this.emailForm.reset();
    promise.catch(error => //Sean: this method will run if firebase reports a problem
      {    
      alert('Something has went wrong, the email was not saved, please try again');
      console.log('sending failed') //console debug
      });
    }
  }
}

