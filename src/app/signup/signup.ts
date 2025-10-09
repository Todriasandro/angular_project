import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tools } from '../tools';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
constructor(public service: Tools) {}

  public formInfo: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    age: new FormControl(),
    email: new FormControl(),

    password: new FormControl(),

    address: new FormControl(),

    phone: new FormControl(),

    zipcode: new FormControl(),

    avatar: new FormControl(),

    gender: new FormControl(),
  });

  register() {
    this.service.signup(this.formInfo.value).subscribe((data:any)=>{
      console.log(data);
    })
  }
}
