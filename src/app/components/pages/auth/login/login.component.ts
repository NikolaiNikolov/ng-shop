import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { LoginInputModel } from '../../../../core/models/input-models/login-input.model';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = {};

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    })

    const usernameControl = this.loginForm.get('username');
    usernameControl
      .valueChanges
      .debounceTime(1000)
      .subscribe(v => this.setMessage(usernameControl, "username"));

    const passwordControl = this.loginForm.get('password');
    passwordControl
      .valueChanges
      .debounceTime(1000)
      .subscribe(v => this.setMessage(passwordControl, "password"));
  }

  setMessage(c: AbstractControl, inputField) {
    this.errors[inputField] = "";

    if ((c.touched || c.dirty) && c.errors) {
      const errorType = Object.keys(c.errors)[0];
      let message = "";

      switch (errorType) {
        case "required":
          message = `${this.capitalize(inputField)} is required`;
          break;
        case "minlength":
          message = `${this.capitalize(inputField)} can't be shorter than ${c.errors[errorType]["requiredLength"]} symbols`;
          break;
        default:
          break;
      }
      this.errors[inputField] = message;
    }
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  login() {
    const { username, password } = this.loginForm.value;
    const user = new LoginInputModel(username, password);

    this.auth.login(user)
      .subscribe(userDate => {
        this.successfulLogin(userDate);
      })
  }

  successfulLogin(data): void {
    this.auth.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('userId', data['_id']);
    this.router.navigate(["home"]);
  }
}
