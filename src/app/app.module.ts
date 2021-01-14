import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';

import { EmailComponent } from './email/email.component';
import { NewsComponent } from './news/news.component';
import { ScenarioComponent } from './scenario/scenario.component';

import { ChatComponent } from './chat/chat.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { NewsPublishComponent } from './news-publish/news-publish.component';

import { ControlComponent } from './components/control/control.component';
import { OwnerComponent } from './components/owner/owner.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantAddComponent } from './components/participant-add/participant-add.component';
import { RoleComponent } from './components/role/role.component';
import { RoleAddComponent } from './components/role-add/role-add.component';
import { AffiliateComponent } from './components/affiliate/affiliate.component';
import { AffiliateAddComponent } from './components/affiliate-add/affiliate-add.component';
import { TweetComponent } from './components/tweet/tweet.component';


import { AffiliateService } from './services/affiliate.service';
import { AuthService } from './services/auth.service';
import { ParticipantService } from './services/participant.service';
import { OwnerService } from './services/owner.service';
import { RoleService } from './services/role.service';


/*
 * All imports for emails including services and external componenets
 */
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EmailComposeComponent } from './email/email-compose/email-compose.component';
import { EmailInboxComponent } from './email/email-inbox/email-inbox.component';
import { EmailDeletedComponent } from './email/email-deleted/email-deleted.component';
import { EmailDraftsComponent } from './email/email-drafts/email-drafts.component';
import { EmailSentComponent } from './email/email-sent/email-sent.component';
import { EmailListComponent } from './email/email-list/email-list.component';
import { EmailService } from './services/email.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './components/profile/profile.component';
import { DiaryComponent } from './diary/diary.component';
import { RolePageComponent } from './RolePage/RolePage.component';
import { NgChatModule } from 'ng-chat';
import { HttpModule } from '@angular/http';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NavigationComponent,
    TweetComponent,
    EmailComponent,
    RoleComponent,
    NewsComponent,
    ScenarioComponent,
    ControlComponent,
    ChatComponent,
    EmailViewComponent,
    NewsPublishComponent,
    ParticipantComponent,
    OwnerComponent,
    ParticipantAddComponent,
    RoleAddComponent,
    AffiliateComponent,
    AffiliateAddComponent,
    EmailComposeComponent,
    EmailInboxComponent,
    EmailDeletedComponent,
    EmailDraftsComponent,
    EmailSentComponent,
    EmailListComponent,
    ProfileComponent,
    DiaryComponent,
    RolePageComponent,
    StatisticsComponent,
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbModule,
    Ng2SearchPipeModule,
    HttpModule,
    NgChatModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AuthService,
    AffiliateService,
    ParticipantService,
    OwnerService,
    RoleService,
    EmailService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
