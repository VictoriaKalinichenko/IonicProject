import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateUserView } from '../shared/models/authenticate-user-view';
import { UserService } from '../shared/services/user.service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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

  validationMessages = {
    email: 'Email is required.',
    password: 'Password is required.',
    form: 'Please, fill in the form correctly'
  };

  constructor(
    public navCtrl: NavController, 
    private userService: UserService, 
    private googlePlus: GooglePlus, 
    private facebook: Facebook, 
    public formBuilder: FormBuilder
    ) {
    this.form = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 

    this.user = new AuthenticateUserView();
  }

  authenticate() : void {
    if(!this.form.valid){
      this.formIsNotValid = true;
    }

    if(this.form.valid){
      this.formIsNotValid = false;
      this.user = this.form.value;
      this.userService.authenticate(this.user)
            .subscribe(
            (data) => {
              if (data == "") {
                this.navCtrl.push(HomePage);
              }
              if (data != "") {
                this.serverError = data.toString();
              }
            }
            );
    }
  }

  googleLogin(): void {
    this.googlePlus.login({})
      .then(result => {
        console.log(result);
        this.user.email = result.email;
        this.isLoggedInWithGoogle = true;
      })
      .catch(error => console.error(error));
  }

  facebookLogin(): void {
    this.facebook.login(['email'])
    .then((result: FacebookLoginResponse) => { 
      console.log('Logged into Facebook!', result);
      this.facebookToken = result.authResponse.accessToken;
      this.isLoggedInWithFacebook = true;
    })
    .catch(error => console.log('Error logging into Facebook', error));
  }

  goToRegisterPage(): void {
    this.navCtrl.push(RegisterPage);
  }
}
