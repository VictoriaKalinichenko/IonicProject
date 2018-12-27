import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = RegisterPage;

  constructor() {

  }
}
