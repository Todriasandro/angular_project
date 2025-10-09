import { Component } from '@angular/core';
import { Signin } from '../signin/signin';

@Component({
  selector: 'app-login',
  imports: [Signin],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
