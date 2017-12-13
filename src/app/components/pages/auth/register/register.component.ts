import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { RegisterInputModel } from '../../../../core/models/input-models/register.input.model';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors = {};

  constructor(
    private fb: FormBuilder,    
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ["", [ Validators.required, Validators.minLength(3) ] ],
      firstName: ["", [ Validators.required,Validators.minLength(2) ] ],
      lastName: ["", [ Validators.required, Validators.minLength(2) ] ],
      password: ["", [ Validators.required, Validators.minLength(3) ] ],
      confirm: ["", [ Validators.required, Validators.minLength(3) ] ]
    })

    let usernameControl = this.registerForm.get("username");
    let firstNameControl = this.registerForm.get("firstName");
    let lastNameControl = this.registerForm.get("lastName");
    let passwordControl = this.registerForm.get("password");
    let confirmControl = this.registerForm.get("confirm");

    usernameControl
    .valueChanges
    .debounceTime(1000)
    .subscribe(v => this.setMessage(usernameControl, "username"));

    firstNameControl
    .valueChanges
    .debounceTime(1000)
    .subscribe(v => this.setMessage(firstNameControl, "firstName"));

    lastNameControl
    .valueChanges
    .debounceTime(1000)
    .subscribe(v => this.setMessage(lastNameControl, "lastName"));

    passwordControl
    .valueChanges
    .debounceTime(1000)
    .subscribe(v => this.setMessage(passwordControl, "password"));

    confirmControl
    .valueChanges
    .debounceTime(1000)
    .subscribe(v => this.setMessage(confirmControl, "confirm"));
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

  register() {
    const { username, firstName, lastName, password, confirm } = this.registerForm.value;
    let user = new RegisterInputModel(username, firstName, lastName, password, confirm);
    this.auth.register(user).
    subscribe(userData => {
      this.registerSucces(userData);
    })
  }

  registerSucces(userData) {
    this.router.navigate(['login']);
  }
}
