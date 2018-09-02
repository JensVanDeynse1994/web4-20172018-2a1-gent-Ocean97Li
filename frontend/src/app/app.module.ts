import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MapSettingsService } from './main/services/map-settings.service';
import { GeolocationService } from './main/services/geolocation.service';
import { AuthenticationService } from './user-auth/authentication.service';
import { AuthGuardService } from './user-auth/auth-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material';
import { GOOGLE_MAPS_API } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    MapSettingsService,
    GeolocationService,
    AuthenticationService,
    AuthGuardService
  ]
})

export class AppModule {
  constructor(private gmap: MapSettingsService) {
    GOOGLE_MAPS_API.apikey = gmap.getMapApiKey();
  }
}

