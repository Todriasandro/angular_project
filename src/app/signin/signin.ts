import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Tools } from '../tools';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  
  router = inject(Router);

  constructor(public service: Tools, private snackBar: MatSnackBar) {}

  showPassword = false;

  loginFormInfo = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginFormInfo.valid) {
      this.service.signin(this.loginFormInfo.value).subscribe({
        next: (data: any) => {
          const name = this.loginFormInfo.value.email?.split('@')[0] || 'User';
          sessionStorage.setItem('token', data.access_token);
          sessionStorage.setItem('username', name);

          this.snackBar.open(`🎉 Welcome back, ${name}!`, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success']
          });

          this.router.navigate(['/main']);
        },
        error: () => {
          this.snackBar.open('❌ Invalid email or password', 'Close', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-error']
          });
        }
      });
    }
    
  }
  
  
}
