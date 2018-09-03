import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MapSettingsService } from './main/services/map-settings.service';
import { GeolocationService } from './main/services/geolocation.service';
import { AuthenticationService } from './user-auth/authentication.service';
import { AuthGuardService } from './user-auth/auth-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material';
import { AppLoadService } from './app-load.service';

export function get_api(appLoadService: AppLoadService) {
  return () => appLoadService.getAPI();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: get_api, deps: [AppLoadService], multi: true },
    MapSettingsService,
    AuthenticationService,
    AuthGuardService
  ]
})

export class AppModule {
}

