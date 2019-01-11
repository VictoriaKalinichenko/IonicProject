import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateUserView } from '../shared/models/authenticate-user-view';
import { UserService } from '../shared/services/user.service';
import { GoogleDriveService } from '../shared/services/google-drive.service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {
  user: AuthenticateUserView;
  form: FormGroup;
  formIsNotValid: boolean = false; 
  serverError: string = "";
  isLoggedInWithGoogle: boolean = false;
  isLoggedInWithFacebook: boolean = false;
  facebookToken: string = "";
  pdfObject: any;

  apiKey: string = "AIzaSyBHAtNEG2JHgOTlVl2N7jhZiZuvfh71PcM";
  clientId: string = "265255600993-707ns6l6sgd19rgh2cebnkh1q0sdunqu.apps.googleusercontent.com";
  scopes: "https://www.googleapis.com/auth/drive ";
  googleAuth: any;
  accessToken: string = "";

  authInstance: any;

  validationMessages = {
    email: 'Email is required.',
    password: 'Password is required.',
    form: 'Please, fill in the form correctly'
  };

  constructor(
    private userService: UserService, 
    private googleDriveService: GoogleDriveService, 
    private googlePlusService: GooglePlus, 
    private facebookService: Facebook, 
    private fileService: File,
    private fileOpenerService: FileOpener,
    public navigationController: NavController, 
    public formBuilder: FormBuilder
    ) {
    this.form = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 

    this.user = new AuthenticateUserView();
  }

  authenticate() : void {
    this.formIsNotValid = true;

    if(this.form.valid){
      this.formIsNotValid = false;
      this.user = this.form.value;
      this.userService.authenticate(this.user)
        .subscribe(() => this.navigationController.push(HomePage));
    }
  }

  googleLogin(): void {
    // this.googlePlusService.login({})
    //   .then(result => {
    //     console.log(result);
    //     this.user.email = result.email;
    //     this.googleDriveService.setAccessToken(result.accessToken);
    //     this.isLoggedInWithGoogle = true;
    //   })
    //   .catch(error => console.error(error));

    gapi.load('auth2', function() {
      gapi.auth2.init({
          client_id: this.clientId,
          scope: this.scopes
      });          
    });

    var auth2 = gapi.auth2.getAuthInstance();      
    auth2.signIn()
    .then(function(data) {
      console.log(auth2.currentUser.get().getAuthResponse().id_token);  
      this.googleDriveService.setAccessToken(auth2.currentUser.get().getAuthResponse().id_token);
    })
    .catch((error) => console.log(error));  
  }

  facebookLogin(): void {
    this.facebookService.login(['email'])
    .then((result: FacebookLoginResponse) => { 
      console.log('Logged into Facebook!', result);
      this.facebookToken = result.authResponse.accessToken;
      this.isLoggedInWithFacebook = true;
    })
    .catch(error => console.log('Error logging into Facebook', error));
  }

  goToRegisterPage(): void {
    this.navigationController.push(RegisterPage);
  }

  downloadPdf(): void {
    let fileName = 'myletter.pdf';
    let fileType = 'application/pdf';

    this.createPdf();
  

    this.googleDriveService.uploadFile(this.pdfObject)
      .subscribe((response) => console.log(response));


    // this.pdfObject.getBuffer((buffer) => {
    //   var blob = new Blob([buffer], { type: fileType });
    //   this.fileService.writeFile(this.fileService.dataDirectory, fileName, blob, { replace: true })
    //     .then(fileEntry => {
    //       this.googleDriveService.uploadFile(this.pdfObject);
    //       this.fileOpenerService.open(`${this.fileService.dataDirectory}/${fileName}`, fileType);
    //     })
    //     .catch((error) => console.log(error));
    // });
  }

  createPdf(): void {
    var documentDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: 'Sarah' },
 
        { text: 'To', style: 'subheader' },
        'Diana',
 
        { text: 'Some text', style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObject = pdfMake.createPdf(documentDefinition);
  }
}
