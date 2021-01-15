import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from '../../models/participant';
import { Role } from '../../models/role';
import { Affiliate } from '../../models/affiliate';
import { RoleService } from '../../services/role.service';
import { AffiliateService } from '../../services/affiliate.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit {
    roleID: string;
    user: Participant = { systemRole: '' };
    role: Role;
    affiliates: Affiliate[];
    authError: any;
    public Editor = Editor;
    editorConfig = {
        toolbar: {
            items: [
                'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
                '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'undo', 'redo']
        },
        image: {
            toolbar: [
                'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
            styles: [
                'alignLeft', 'alignCenter', 'alignRight'],
        },
        language: 'en'
    };

    constructor(
        private auth: AuthService,
        private roleService: RoleService,
        private affiliateService: AffiliateService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
        });

        this.roleID = this.route.snapshot.paramMap.get('id');

        this.roleService.getRole(this.roleID).subscribe(rolesFromDB => {
            this.role = rolesFromDB;
        });

        this.affiliateService.get().subscribe(affiliate => {
            this.affiliates = affiliate;
        });
    }

    update(editedRole) {
        if (editedRole.title !== '') {
            editedRole.id = this.roleID;
            this.roleService.update(editedRole);
            this.router.navigate(['/control']);
        }
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    uploadAvatar() {
        alert('Upload image not implemented');
    }
}
