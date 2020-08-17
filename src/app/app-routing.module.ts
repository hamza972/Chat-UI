import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { EmailComponent } from './email/email.component';
import { NewsComponent } from './news/news.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { DiaryComponent } from './diary/diary.component';
import { ChatComponent } from './chat/chat.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { NewsPublishComponent } from './news-publish/news-publish.component';

import { ControlComponent } from './components/control/control.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantAddComponent } from './components/participant-add/participant-add.component';
import { RoleComponent } from './components/role/role.component';
import { RoleAddComponent } from './components/role-add/role-add.component';
import { AffiliateComponent } from './components/affiliate/affiliate.component';
import { AffiliateAddComponent } from './components/affiliate-add/affiliate-add.component';
import { TweetComponent } from "./components/tweet/tweet.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
{ path: 'affiliate', component: AffiliateComponent },
{ path: 'affiliate-add', component: AffiliateAddComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registration', component: RegistrationComponent},
{ path: 'home', component: HomeComponent},
{ path: 'tweet', component: TweetComponent},
{ path: 'email', component: EmailComponent},
{ path: 'email-view', component: EmailViewComponent},
{ path: 'news-publish', component: NewsPublishComponent},
{ path: 'news', component: NewsComponent},
{ path: 'control', component: ControlComponent},
{ path: 'scenario', component: ScenarioComponent},
{ path: 'diary', component: DiaryComponent},
{ path: 'role', component: RoleComponent},
{ path: 'role-add', component: RoleAddComponent},
{ path: 'chat', component: ChatComponent},
{ path: 'participant', component:ParticipantComponent},
{ path: 'participant-add', component:ParticipantAddComponent},
{ path: 'profile/:id', component:ProfileComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
