import { Component } from '@angular/core';

import { Signup } from '../signup/signup';

@Component({
  selector: 'app-auth',
  imports: [Signup],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

}
