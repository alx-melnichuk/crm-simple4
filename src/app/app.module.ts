import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Tracing } from './_consts/app.consts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProfileService } from './_services/profile.service';
import { PermissionsGuard } from './_guards/permissions.guard';
import { MockClientInterceptor } from './_interceptors/mock-client.interceptor';
import { MockTaskInterceptor } from './_interceptors/mock-task.interceptor';

const provideMock = [
  { provide: HTTP_INTERCEPTORS, useClass: MockClientInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockTaskInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule, // ** Must be loaded first **
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ...(!environment.production ? provideMock : []),
    ProfileService,
    PermissionsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Tracing.log('AppModule();');
  }
}
