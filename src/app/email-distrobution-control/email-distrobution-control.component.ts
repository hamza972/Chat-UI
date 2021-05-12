import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailDistributionLists } from 'src/app/models/email-distrobution';
import { EmailDistributionService } from 'src/app/services/EmailDistrobutionList.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-email-distrobution-control',
  templateUrl: './email-distrobution-control.component.html',
  styleUrls: ['./email-distrobution-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailDistrobutionControlComponent implements OnInit {

  emailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private emaildistroService: EmailDistributionService
  ) {
    this.emailForm = this.formBuilder.group({
      emaildistroemail: [null, [Validators.required,
      Validators.pattern("(([a-zA-Z0-9._%+-]+@{1}([a-zA-Z0-9.-]+[a-zA-Z\.])+)+([\\s]?[,]{1}[\\s]?)?)+")]],
      distrolist: [null, [Validators.required,
        Validators.pattern("(([a-zA-Z0-9._%+-]+@{1}([a-zA-Z0-9.-]+[a-zA-Z\.])+)+([\\s]?[,]{1}[\\s]?)?)+")]]
      //Reusing the regex for email input
      //Feature lost in commit 4d21784e3f5, was added in earlier 1154066f603 credit to past student, MUHAMMAD ZORAIN ALI
      //original regex [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$ Current Version improved by Sean to permit capitals.
      //The backend will deal with capitals.
      //this has been further updated to only permit one @ symbol and allow multiple comma and space separated emails.
    });
  }

  ngOnInit() {
  
  }
  
  Onsubmit(formdata){
    var recipients: string = ((formdata.distrolist as string).toLowerCase().trim());
    var recipientslist: string[] = recipients.split(',');
    for (let index = 0; index < recipientslist.length; index++) {
      recipientslist[index] = recipientslist[index].trim();
    }
    var newemaildistro: EmailDistributionLists = {
      List: recipientslist,
      email: ((formdata.emaildistroemail as string).toLowerCase().trim()),
    }
    var promise: Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> = this.emaildistroService.Add(newemaildistro);
    promise.then(result => {
      alert('Your Email distrobution list has been created')
      this.emailForm.reset();
    });
    promise.catch(error => //Sean: this method will run if firebase reports a problem
    {
      alert('Something has went wrong, the email distrobution list was not setup');
      console.log('sending failed') //console debug
    });
  }
}
