import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
    selector: 'app-affiliate-edit',
    templateUrl: './affiliate-edit.component.html',
    styleUrls: ['./affiliate-edit.component.scss']
})
export class AffiliateEditComponent implements OnInit {
    countryName: string;
    user: firebase.User;
    name: string;
    affiliate: Affiliate;
    authError: any;
    affiliateCollection: AngularFirestoreCollection<Affiliate>;
    constructor(
        private auth: AuthService,
        private affiliateService: AffiliateService,
        private router: Router,
        private route: ActivatedRoute,
        public afs: AngularFirestore
    ) {}

    ngOnInit(): void {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
        });
        this.countryName = this.route.snapshot.paramMap.get('affiliatecountryName');
        this.affiliateService.getAffiliate(this.countryName).subscribe(rolesFromDB=>{
            this.affiliate = rolesFromDB;
        })
    }
    

  update() {
    var text = (<HTMLInputElement>document.getElementById("editName")).value; 
    if(text.length==0){
      alert("please use valid input")
    }else{
      this.afs.collection('Countries').doc(this.countryName).update({
        countryName: text,
        name: text
       }).then(function(){
         console.log("update document, line 53");
         
       })
    }
    this.router.navigate(['./control'])
  }

      
    cancel() {
        this.router.navigate(['/control']);
    }

    add() {
        if (this.affiliate.name !== '') {
            this.affiliateService.add(this.affiliate);
            this.router.navigate(['/control']);
        }
    }

}