import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUserView } from '../../app/models/register-user-view';
import { UserService } from '../../app/services/user.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    user: RegisterUserView;
    form: FormGroup;
    formIsNotValid: boolean = false;
    isPasswordMismatch: boolean = false;

    validationMessages = {
        'name': [
        { type: 'required', message: 'Name is required.' },
        { type: 'maxlength', message: 'Name cannot be more than 30 characters long.' },
        { type: 'pattern', message: 'Your name must contain only letters.' }
        ],
        'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'email', message: 'Enter a valid email.' }
        ],
        'address': [
        { type: 'required', message: 'Address is required.' }
        ],
        'phone': [
        { type: 'required', message: 'Phone is required.' }
        ],
        'birthDate': [
        { type: 'required', message: 'Birth date is required.' }
        ],
        'gender': [
        { type: 'required', message: 'Gender is required.' }
        ],
        'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 8 characters long.' }
        ],
        'confirmPassword': [
        { type: 'required', message: 'Confirm password is required' }
        ],
        form: 'Please, fill in the form correctly',
        passwordMismatch: 'Password mismatch'
    };

    constructor(public navCtrl: NavController, private userService: UserService, public formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            birthDate: ['', Validators.required],
            gender: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.call(
                (formGroup: FormGroup) => {
                    if (formGroup.value["password"] != formGroup.value["confirmPassword"])
                    {
                        return false;
                    }
                })])
            ]
        });
    }

    register(): void
    {
        if(!this.form.valid){
            this.formIsNotValid = true;
        }

        if(this.form.value["password"] == this.form.value["confirmPassword"]){
            this.isPasswordMismatch = false;
        }

        if(this.form.value["password"] != this.form.value["confirmPassword"]){
            this.isPasswordMismatch = true;
        }

        if(this.form.valid && !this.isPasswordMismatch){
            this.formIsNotValid = false;
            this.user = this.form.value;
            this.userService.register(this.user)
                .subscribe(
                    () => {
                        this.navCtrl.push(HomePage);
                    }
                );
        }
    }
}
