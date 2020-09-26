import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6), (control) => this.verifyConfirmPassword(control, 'confirmPassword') ]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6), (control) => this.verifyConfirmPassword(control, 'password') ]]
    });
  }

  ngOnInit(): void {
  }

  verifyConfirmPassword(control: AbstractControl, name: string) {
    if (this.form) {
      if (this.form.get('password').value != this.form.get('confirmPassword').value) {
        return { confirmPassword: true };
      }

      if (this.form.get('password').hasError('confirmPassword')) {
        this.form.get('password').setErrors(null);
        this.form.get('password').updateValueAndValidity();
      }
      if (this.form.get('confirmPassword').hasError('confirmPassword')) {
        this.form.get('confirmPassword').setErrors(null);
        this.form.get('confirmPassword').updateValueAndValidity();
      }

      return null;
    }
    return null;
  }

  handleRegister(): void {
    this.authService.makeRegister(this.form.getRawValue())
      .subscribe((token: string) => {
        if (token) {
          this.router.navigateByUrl('cars/list');
        }
      });
  }
}
