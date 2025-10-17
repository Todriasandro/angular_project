import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatIconModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  showPassword = false;

  formInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl(''),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    const apiUrl = 'https://api.everrest.educata.dev/auth/sign_up';

    const formValue = this.formInfo.value;

    // თუ ნომერი არ იწყება +995-ით → დაამატე ავტომატურად
    const fullPhone = formValue.phone?.startsWith('+995')
      ? formValue.phone
      : `+995${formValue.phone}`;

    const dataToSend = { ...formValue, phone: fullPhone };

    this.http.post(apiUrl, dataToSend).subscribe({
      next: (data: any) => {
        console.log('Signup success:', data);

        const name = this.formInfo.value.firstName;
        localStorage.setItem('username', name || 'User');

        alert(`🎉 Welcome, ${name || 'User'}! Registration successful.`);
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('❌ რეგისტრაცია ვერ შესრულდა. სცადე თავიდან.');
      }
    });
  }
}
