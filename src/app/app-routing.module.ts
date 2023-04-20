import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { HistoryComponent } from './components/history/history.component';
import { QaComponent } from './components/qa/qa.component';
import { RealDashboardComponent } from './components/real-dashboard/real-dashboard.component';
import { KnowledgeGraphComponent } from './components/knowledge-graph/knowledge-graph.component';
import { HomeComponent } from './components/home/home.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'text-summarization', component: DashboardComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'knowledge-graph', component: KnowledgeGraphComponent },
  { path: 'dashboard', component: RealDashboardComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'qa', component: QaComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
