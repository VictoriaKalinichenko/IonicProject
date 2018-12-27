import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateUserView } from '../../app/models/authenticate-user-view';
import { UserService } from '../../app/services/user.service';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: AuthenticateUserView;
  form: FormGroup;
  formIsNotValid: boolean = false; 
  serverError: string = "";

  validationMessages = {
    email: 'Email is required.',
    password: 'Password is required.',
    form: 'Please, fill in the form correctly'
  };

  constructor(public navCtrl: NavController, private userService: UserService, public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  authenticate()
  {
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
                //this.navCtrl.push(AboutPage);
              }
              if (data != "") {
                this.serverError = data.toString();
              }
            }
            );
    }
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
