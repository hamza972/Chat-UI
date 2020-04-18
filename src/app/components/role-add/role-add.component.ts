import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Role } from '../../models/Role';
import { Affiliate } from '../../models/Affiliate';

@Component({
    selector: 'app-role-add',
    templateUrl: './role-add.component.html',
    styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

    role: Role = { firstName?: "" };
    affiliates: Affiliate[];

    constructor(
        private roleService: RoleService,
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.affiliateService.get().subscribe(affiliate => {
            console.log(affiliate);
            this.affiliates = affiliate;
        });
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add(form) {
        if(this.role.roleName != '') {
            this.roleService.add(this.role);
            this.router.navigate(['/control']);
        }
    }

}
