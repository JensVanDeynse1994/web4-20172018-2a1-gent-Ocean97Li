import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AgmCoreModule } from '@agm/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RealTimeService } from './real-time.service';
import { basehttpInterceptorProviders } from '../http-interceptors';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

// import { basehttpInterceptorProviders } from '../http-interceptors';
const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: UserAuthModule.api
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  providers: [
    RealTimeService,
    basehttpInterceptorProviders,
  ],
  exports: []
})
export class UserAuthModule {
  public static api: string;
  constructor(private http: HttpClient) {
    http.get('API/gmaps').subscribe(
      p => UserAuthModule.api = p.toString()
    );
  }
}
