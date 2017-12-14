import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/pages/error/not-found/not-found.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ServiceModule } from './core/services/services.module';

import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from './components/shared/shared.module';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ServiceModule,
    HttpModule,
    NgProgressModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }