import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  loginForm!: FormGroup;



  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Rendered on the client');
    } else {
      console.log('Rendered on the server');
    }
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }



  login() {
    console.log(this.loginForm.value)
  }

}
