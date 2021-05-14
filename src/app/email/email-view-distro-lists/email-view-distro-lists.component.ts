import { Component, OnInit } from '@angular/core';
import { EmailDistributionLists } from 'src/app/models/email-distrobution';
import { EmailDistributionService } from 'src/app/services/EmailDistrobutionList.service';

@Component({
  selector: 'app-email-view-distro-lists',
  templateUrl: './email-view-distro-lists.component.html',
  styleUrls: ['./email-view-distro-lists.component.scss']
})
export class EmailViewDistroListsComponent implements OnInit {

  EmailDistributionListsArray: EmailDistributionLists[];

  constructor(    private emaildistroService: EmailDistributionService)
  { 
    
  }

  ngOnInit() {

    //Get email distrobution lists, all of them.
    this.emaildistroService.Get().subscribe( result => {
      this.EmailDistributionListsArray = result;
      console.log(result);
    })
  }
}
