import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateUserView } from '../shared/models/authenticate-user-view';
import { UserService } from '../shared/services/user.service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { GooglePlus } from "@ionic-native/google-plus";

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
  isLoggedIn: boolean = false;

  validationMessages = {
    email: 'Email is required.',
    password: 'Password is required.',
    form: 'Please, fill in the form correctly'
  };

  constructor(public navCtrl: NavController, private userService: UserService, private googlePlus: GooglePlus, public formBuilder: FormBuilder) {
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
    this.googlePlus.getSigningCertificateFingerprint()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));


    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.storeEmail(res.email);
        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  goToRegisterPage(): void {
    this.navCtrl.push(RegisterPage);
  }

  storeEmail(email: string): void {
    this.user.email = email;
  }
}
