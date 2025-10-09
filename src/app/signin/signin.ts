import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Tools } from '../tools';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {
 router=inject(Router);
  constructor(public service:Tools){

  }

  public loginFormInfo:FormGroup=new FormGroup({
    email:new FormControl(), 
    password:new FormControl(),
  })


  login(){
    this.service.signin(this.loginFormInfo.value).subscribe((data:any)=>{
      console.log("this is", data); 
      sessionStorage.setItem("user", data.access_token); 
      alert("sucess"); 
      this.router.navigate(['profile'])
    })
  }

}
