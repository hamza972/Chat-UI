import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';

@Component({
    selector: 'app-affiliate-add',
    templateUrl: './affiliate-add.component.html',
    styleUrls: ['./affiliate-add.component.scss']
})
export class AffiliateAddComponent implements OnInit {

    user: firebase.User;
    affiliates: Affiliate[];
    affiliate: Affiliate = {
        name: ''
    };
    authError: any;

    constructor(
        private auth: AuthService,
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                /* Check if user's role position is control */
                if (user[0].systemRole !== 'admin') {
                    this.router.navigate(['/home']);
                }
                this.affiliateService.get().subscribe(affiliates => {
                    this.affiliates = affiliates;
                });
            }
        });
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add() {
        this.affiliate.name = this.processAffiliateName(this.affiliate.name);
        if (this.affiliate.name !== '') {
            for (const affiliate of this.affiliates) {
                if (affiliate.name === this.affiliate.name) {
                    alert('Affiliate name already in use!');
                    return;
                }
            }
            this.affiliateService.add(this.affiliate);
            this.router.navigate(['/control']);
        }
    }

    private processAffiliateName(name: string): string {
        let processedName = '';
        if (name.length < 2) { return processedName; }
        const nameSplit = name.split(' ');
        for (let subName of nameSplit) {
            subName = subName[0].toUpperCase() + subName.slice(1).toLowerCase();
            processedName += subName + ' ';
        }
        processedName = processedName.trim();
        console.log(processedName);
        return processedName;
    }

}
