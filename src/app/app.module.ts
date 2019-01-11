import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ionic2MaskDirective } from "ionic2-mask-directive";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from '@ionic-native/facebook';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { RegisterPage } from './register/register';
import { HomePage } from './home/home';
import { TabsPage } from './tabs/tabs';
import { LoginPage } from './login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RequestInterceptor } from './shared/interceptors/request-interceptor';
import { UserService } from './shared/services/user.service';
import { GoogleDriveService } from './shared/services/google-drive.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    TabsPage,
    RegisterPage,
    LoginPage,
    Ionic2MaskDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    RegisterPage,
    HomePage,
    LoginPage,
    TabsPage
  ],
  providers: [
    UserService,
    GoogleDriveService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    StatusBar,
    GooglePlus,
    Facebook,
    File,
    FileOpener,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
