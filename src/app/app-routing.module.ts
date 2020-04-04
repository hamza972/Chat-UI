import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { TweetComponent } from './tweet/tweet.component';
import { EmailComponent } from './email/email.component';
import { NewsComponent } from './news/news.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { RoleComponent } from './role/role.component';
import { ControlComponent } from './control/control.component';
import { CountrytoolComponent } from './countrytool/countrytool.component';
import { RoletoolComponent } from './roletool/roletool.component';
import { ParticipanttoolComponent } from './participanttool/participanttool.component';
import { ParticipantlistComponent } from './participantlist/participantlist.component';
import { ChatComponent } from './chat/chat.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { NewsPublishComponent } from './news-publish/news-publish.component';
import { UserComponent } from './user/user.component';
import { UserSubComponent } from './user-sub/user-sub.component';


const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'participantlist', component: ParticipantlistComponent },
{ path: 'registration', component: RegistrationComponent},
{ path: 'home', component: HomeComponent},
{ path: 'tweet', component: TweetComponent},
{ path: 'email', component: EmailComponent},
{ path: 'email-view', component: EmailViewComponent},
{ path: 'news-publish', component: NewsPublishComponent},
{ path: 'news', component: NewsComponent},
{ path: 'control', component: ControlComponent},
{ path: 'scenario', component: ScenarioComponent},
{ path: 'role', component: RoleComponent},
{ path: 'countryTool', component: CountrytoolComponent},
{ path: 'roleTool', component: RoletoolComponent},
{ path: 'chat', component: ChatComponent},
{ path: 'participantTool', component:ParticipanttoolComponent},
{ path: 'user', component:UserComponent},
{ path: 'user-sub', component:UserSubComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
