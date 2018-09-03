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
import { GeolocationService } from '../main/services/geolocation.service';
import { GOOGLE_MAPS_API } from '../app-load.service';

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
      apiKey: GOOGLE_MAPS_API.api
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
    GeolocationService,
    basehttpInterceptorProviders,
  ],
  exports: []
})
export class UserAuthModule {
}
