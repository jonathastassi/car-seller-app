import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.authService.makeLogin(this.form.getRawValue())
      .subscribe((token: string) => {
        if (token) {
          this.router.navigateByUrl('cars/list');
        }
      });
  }

}
