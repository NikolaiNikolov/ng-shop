import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { RegisterInputModel } from '../../../../core/models/input-models/register.input.model';
import { Router } from '@angular/router';

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
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirm: ""
    })
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
