import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ionic2MaskDirective } from "ionic2-mask-directive";

import { RegisterPage } from './register/register';
import { HomePage } from './home/home';
import { TabsPage } from './tabs/tabs';
import { LoginPage } from './login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RequestInterceptor } from './shared/interceptors/request-interceptor';
import { UserService } from './shared/services/user.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    RegisterPage,
    LoginPage,
    Ionic2MaskDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    HomePage,
    LoginPage,
    TabsPage
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
