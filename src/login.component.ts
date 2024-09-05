import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  user: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  login() {
    const params = {
      method: 'POST',
      body: JSON.stringify({
        email: this.user.controls['email'].value,
        password: this.user.controls['password'].value,
      }),
    };
    this.router.navigate(['home']);
    // TODO: Mock call with a JSON Server or other tool
    /*  return fetch('path/to/api/login', params)
      .then(response => response.json())
      .then(session => {
        this.token = session.token;
        this.router.navigate(['home']);
      }); */
  }
}
