import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TweetComponent } from './tweet/tweet.component';
import { EmailComponent } from './email/email.component';
import { RoleComponent } from './role/role.component';
import { NewsComponent } from './news/news.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ControlComponent } from './control/control.component';
import { CountrytoolComponent } from './countrytool/countrytool.component';
import { RoletoolComponent } from './roletool/roletool.component';
import { ParticipanttoolComponent } from './participanttool/participanttool.component';
import { ParticipantlistComponent } from './participantlist/participantlist.component';
import { ChatComponent } from './chat/chat.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { NewsPublishComponent } from './news-publish/news-publish.component';
import { UserComponent } from './user/user.component';

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
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
