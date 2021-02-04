import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
    selector: 'app-affiliate',
    templateUrl: './affiliate.component.html',
    styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
    affiliates: Affiliate[];
    user: firebase.User;
    editState: boolean = false;
    itemToEdit: Affiliate;
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
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                /* Check if user's role position is control */
                if (user[0].systemRole !== 'admin') {
                    this.router.navigate(['/home']);
                }
            }
        })

        /* Get list of affiliates */
        this.affiliateService.get().subscribe(affiliate => {
            this.affiliates = affiliate;
        });
    }

    add() {
        this.router.navigate(['/affiliate-add']);
    }

    edit(affiliate: Affiliate) {
        console.log("line 47");
        console.log(affiliate);
        this.editState = true;
        this.router.navigate(['/affiliate-edit']);
    }

    update(affiliate: Affiliate) {
        this.affiliateService.update(affiliate);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.itemToEdit = null;
    }

    delete(countryId){
        console.log("countryId is : "+countryId);
        this.afs.collection('Affiliates').doc(countryId).delete().then(function(){
            console.log(countryId + " has been deleted")
            console.log("line 77")
        })
        
    }
}
