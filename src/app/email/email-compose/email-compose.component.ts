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
  @Output() ClearDraft = new EventEmitter<void>(); //SEAN: IS sent to the parent component used to clear drafts.
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
      Validators.pattern("(([a-zA-Z0-9._%+-]+@{1}([a-zA-Z0-9.-]+[a-zA-Z\.])+)+([,]{1}[\\s]?)?)+")]],
      //Feature lost in commit 4d21784e3f5, was added in earlier 1154066f603 credit to past student, MUHAMMAD ZORAIN ALI
      //original regex [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$ Current Version improved by Sean to permit capitals.
      //The backend will deal with capitals.
      //this has been further updated to only permit one @ symbol and allow multiple comma and space separated emails.
      subject: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.get().subscribe((participants) => {
      this.participants = participants.map((participant) => participant.email);
    });
    this.LoadAutoSave();
    setInterval(this.AutoSave, 3000, this.emailForm) //auto saves very 30 seconds.
  }

  ngOnChanges() { //Sean: auto refreshes when a draft email becomes available and puts its into the form. 
    if (this.OptionalDraftEmail != null) {
      this.IsDraft = true
      this.emailForm.patchValue({ sendTo: this.OptionalDraftEmail.to.user });
      this.emailForm.patchValue({ subject: this.OptionalDraftEmail.subject });
      this.emailForm.patchValue({ body: this.OptionalDraftEmail.body });
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
    if (this.IsDraft == true) //sending existing draft emails
    {
      this.MultiSendFromDraft(formdata); //this method handles emails loaded from draft now
    }
    else { //sending normal new emails
      this.MultiSendNew(formdata); //this method handles emails now
    }
  }

  MultiSendNew(formdata) {
    var recipients: string = ((formdata.sendTo as string).toLowerCase().trim());
    var recipientslist: string[] = recipients.split(',');
    for (let index = 0; index < recipientslist.length; index++) { //Sean, Clean Up input
      recipientslist[index] = recipientslist[index].trim();
      console.log(recipientslist[index]);
    }
    if (recipientslist.length > 1) { //for more than one recipient
      for (let index = 0; index < recipientslist.length; index++) {
        this.newEmail = {
          subject: formdata.subject,
          body: formdata.body,
          to: {
            user: recipientslist[index]
          },
          from: {
            user: this.user.role.email,
          },
        };
        this.sendEmail(this.newEmail);
      }
      alert("The email has been sent to the following recipients:" + recipientslist.toString())
    }
    else if (recipientslist.length == 1) { //for only one recipient
      this.newEmail = {
        subject: formdata.subject,
        body: formdata.body,
        to: {
          user: recipientslist[0]
        },
        from: {
          user: this.user.role.email,
        },
      };
      this.sendEmail(this.newEmail);
      alert("The email has been sent to the following recipient:" + recipientslist.toString())
    }
  }

  MultiSendFromDraft(formdata) {
    console.log(recipients);
    var recipients: string = ((formdata.sendTo).toLowerCase().trim()); //set to all lower case, remove preceding and trailing whitespaces. 
    var recipientslist: string[] = recipients.split(','); //split into a string array where a comma occurs.
    for (let index = 0; index < recipientslist.length; index++) { //Sean, Clean Up input
      recipientslist[index] = recipientslist[index].trim(); //remove preceding and trailing whitespaces for each recipient email.
    }
    if (recipientslist.length > 1) {
      //Sean, the existing email object gets sent to the first person on the recipient list
      //the others get new email objects.
      this.OptionalDraftEmail.to.user = recipientslist[0]; //set new information 
      this.OptionalDraftEmail.subject = formdata.subject;
      this.OptionalDraftEmail.body = formdata.body;
      this.OptionalDraftEmail.draft = false;
      this.OptionalDraftEmail.to.deleted = false;
      this.OptionalDraftEmail.from.deleted = false;
      this.OptionalDraftEmail.from.user = this.user.role.email;
      var Updatepromise: Promise<void> = this.emailService.update(this.OptionalDraftEmail); //This will update the email object in firebase, effectively sending it, as the all fields should be correct to appear to the recipent mailbox.
      Updatepromise.then(result => { //this callback is run if sucessful
        alert('Your Email has been sent to ' + recipientslist[0]); //set email to a ll lower case and trim spaces out of it, 
        this.ClearAllFields();
        this.switchtab.emit("inbox"); //emits the switchtab event which instructs the parent component to switch the current tab to the inbox
        this.IsDraft = false; //draft has been sent, switch back to normal new email
        for (let index = 1; index < recipientslist.length; index++) {
          this.newEmail = {
            subject: formdata.subject,
            body: formdata.body,
            to: {
              user: recipientslist[index]
            },
            from: {
              user: this.user.role.email,
            },
          };
          this.sendEmail(this.newEmail); //promises are covered under the that function.
        }
      });
      Updatepromise.catch(error => //Sean: this method will run if firebase reports a problem
      {
        alert('Something has went wrong, the email was not sent, please try again');
        console.log('sending failed') //console debug
      });
    }
    else if (recipientslist.length == 1) { //for only one recipient
      this.OptionalDraftEmail.to.user = recipientslist[0]; //set new information 
      this.OptionalDraftEmail.subject = formdata.subject;
      this.OptionalDraftEmail.body = formdata.body;
      this.OptionalDraftEmail.draft = false;
      this.OptionalDraftEmail.to.deleted = false;
      this.OptionalDraftEmail.from.deleted = false;
      this.OptionalDraftEmail.from.user = this.user.role.email;
      var Updatepromise: Promise<void> = this.emailService.update(this.OptionalDraftEmail); //This will update the email object in firebase, effectively sending it, as the all fields should be correct to appear to the recipent mailbox.
      Updatepromise.then(result => {
        alert('Your Email has been sent to ' + recipientslist[0]); //set email to a ll lower case and trim spaces out of it, 
        this.ClearAllFields();
        this.switchtab.emit("inbox"); //emits the switchtab event which instructs the parent component to switch the current tab to the inbox
        this.IsDraft = false; //draft has been sent, switch back to normal new email
      });
      Updatepromise.catch(error => //Sean: this method will run if firebase reports a problem
      {
        alert('Something has went wrong, the email was not sent, please try again');
        console.log('sending failed') //console debug
      });
    }
  }
  sendEmail(emailtobesent: Email) {
    var promise: Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
    promise = this.emailService.sendEmail(this.newEmail);
    //Sean: Actually checks if the results from firebase before informing the user if it was successful or not!
    promise.then(result => {
      console.log('Your Email has been sent to ' + emailtobesent.to.user + ' , Press ok to continue');
      this.ClearAllFields();
      this.switchtab.emit("inbox"); //emits the switchtab event which instructs the parent componenet to switch the current tab to the inbox
    });
    promise.catch(error => //Sean: this method will run if firebase reports a problem
    {
      alert('Something has went wrong, the email was not sent, please try again');
      console.log('sending failed') //console debug
    });
  }

  draft(formdata) {
    if (formdata.subject == "" || formdata.subject == null) {
      alert("subject must not be empty") //Sean: EMAILS MUST HAVE A SUBJECT, or it will break the drafts section when the search functions throws an exception for missing subject.
      return
    }
    if (this.IsDraft == true) //sending existing draft emails back to drafts
    {
      this.OptionalDraftEmail.to.user = ((formdata.sendTo as string).toLowerCase().trim()); //set new information 
      this.OptionalDraftEmail.subject = formdata.subject;
      this.OptionalDraftEmail.body = formdata.body;
      this.OptionalDraftEmail.draft = true; //this sends it back to drafts instead of a proper send!
      this.OptionalDraftEmail.to.deleted = false;
      this.OptionalDraftEmail.from.deleted = false;
      this.OptionalDraftEmail.from.user = this.user.role.email;
      var Updatepromise: Promise<void> = this.emailService.update(this.OptionalDraftEmail); //This will update the email object in firebase, effectively sending it, as the all fields should be correct to appear to the recipient mailbox.
      Updatepromise.then(result => {
        alert('Your Email has been saved to back to drafts, Press ok to continue'); //set email to a ll lower case and trim spaces out of it, 
        console.log('Sending back to drafts complete') //console debug
        this.ClearAllFields(); 
        this.switchtab.emit("draft"); //emits the switchtab event which instructs the parent component to switch the current tab to the inbox
        this.IsDraft = false; //draft has been sent, switch back to normal new email
      });
      promise.catch(error => //Sean: this method will run if firebase reports a problem
      {
        alert('Something has went wrong, the email was not saved, please try again');
        console.log('sending failed') //console debug
      });
    }
    else { //sending new drafts to the draft section.
      //Sean: Actually checks if the results from firebase before informing the user if it was successful or not!
      this.newEmail = {
        subject: formdata.subject,
        body: formdata.body,
        to: {
          user: formdata.sendTo || ' ',
        },
        from: {
          user: this.user.role.email,
        },
      };
      var promise: Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
      promise = this.emailService.draftEmail(this.newEmail);
      promise.then(result => {
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
  //form clear
  ClearAllFields() {
    this.emailForm.reset();
    if (this.IsDraft == true) 
    {
      this.IsDraft = false;
      this.emailForm.reset();
      this.OptionalDraftEmail = null;
      this.ClearDraft.emit();
    }
    localStorage.removeItem("autosave-to-user"); //clearing the localstorage
    localStorage.removeItem("autosave-subject");
    localStorage.removeItem("autosave-body");
    this.ClearDraft.emit();
  }

  //autosave functions
  AutoSave(emailForm: FormGroup) { //auto runs every 30 seconds, saves the current contents to browser cache
    console.log("Autosave");
    var SubjectControl: AbstractControl; //get the individual controls for each input box
    var ToEmailControl: AbstractControl;
    var BodyControl: AbstractControl;
    SubjectControl = emailForm.get("subject"); //get inputs
    ToEmailControl = emailForm.get("sendTo");
    BodyControl = emailForm.get("body");
    //check input to ensure nothing that is null is saved to the cache
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

  LoadAutoSave() { //this gets called every time the page is refreshed
    var Body: string = localStorage.getItem("autosave-body")
    var toUser: string = localStorage.getItem("autosave-to-user");
    var subject: string = localStorage.getItem("autosave-subject");
    console.log("Loaded draft email from cache")
    if (Body != null) {
      this.emailForm.patchValue({ body: Body });
    }
    if (toUser != null) {
      this.emailForm.patchValue({ sendTo: toUser });
    }
    if (subject != null) {
      this.emailForm.patchValue({ subject: subject });
    }
    else {
      console.log("Attempted to load email details from browser cache, nothing was found")
    }
  }
}

