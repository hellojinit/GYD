import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxTypedJsModule} from 'ngx-typed-js';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from '../environments/environment';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';

import {AuthService} from "./shared/services/auth.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {KnowledgeGraphComponent} from './components/knowledge-graph/knowledge-graph.component';
import {HomeComponent} from './components/home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { RealDashboardComponent } from './components/real-dashboard/real-dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { QaComponent } from './components/qa/qa.component';
// import {LottieModule} from 'ngx-lottie';

// export function playerFactory(): any {
//   return import('lottie-web');
// }

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserProfileComponent,
    KnowledgeGraphComponent,
    HomeComponent,
    RealDashboardComponent,
    HistoryComponent,
    QaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    NgxTypedJsModule,
    MatSidenavModule,
    MatListModule,
    // LottieModule.forRoot({player: playerFactory}),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
