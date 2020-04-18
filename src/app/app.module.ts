import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TweetComponent } from './tweet/tweet.component';
import { EmailComponent } from './email/email.component';
import { NewsComponent } from './news/news.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { CountrytoolComponent } from './countrytool/countrytool.component';
import { RoletoolComponent } from './roletool/roletool.component';
import { ParticipanttoolComponent } from './participanttool/participanttool.component';
import { ParticipantlistComponent } from './participantlist/participantlist.component';
import { ChatComponent } from './chat/chat.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { NewsPublishComponent } from './news-publish/news-publish.component';
import { UserComponent } from './user/user.component';
import { UserSubComponent } from './user-sub/user-sub.component';

import { ControlComponent } from './components/control/control.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantAddComponent } from './components/participant-add/participant-add.component';
import { RoleComponent } from './components/role/role.component';
import { RoleAddComponent } from './components/role-add/role-add.component';
import { AffiliateComponent } from './components/affiliate/affiliate.component';
import { AffiliateAddComponent } from './components/affiliate-add/affiliate-add.component';

import { AffiliateService } from './services/affiliate.service';
import { ParticipantService } from './services/participant.service';
import { RoleService } from './services/role.service';

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
    CountrytoolComponent,
    RoletoolComponent,
    ParticipanttoolComponent,
    ParticipantlistComponent,
    ChatComponent,
    EmailViewComponent,
    NewsPublishComponent,
    UserComponent,
    UserSubComponent,
    ParticipantComponent,
    ParticipantAddComponent,
    RoleAddComponent,
    AffiliateComponent,
    AffiliateAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbModule
  ],
  providers: [
      AffiliateService,
      ParticipantService,
      RoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
