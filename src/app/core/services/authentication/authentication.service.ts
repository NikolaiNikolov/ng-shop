import { Injectable } from '@angular/core';
import { LoginInputModel } from '../../models/input-models/login-input.model';
import { HttpClientService } from '../http-client/http-client.service';
import { APP_KEY } from '../../config/kinvey.config';
import { RegisterInputModel } from '../../models/input-models/register.input.model';
import { UserViewModel } from '../../models/view-models/user-view.model';

const registerUrl = `https://baas.kinvey.com/user/${APP_KEY}/`;
const loginUrl = `https://baas.kinvey.com/user/${APP_KEY}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${APP_KEY}/_logout`

@Injectable()
export class AuthenticationService {
  private currentAuthtoken : string;
  
  constructor(
    private http: HttpClientService
  ) { }

  login(loginModel: LoginInputModel) {
    return this.http.post(loginUrl, loginModel, 'Basic');
  }

  register(registerModel: RegisterInputModel) {
    return this.http.post(registerUrl, registerModel, 'Basic');
  }

  getUser(id) {
    return this.http.get(registerUrl + id, "Kinvey")
    .map(u => new UserViewModel(u._id, u.username, u.firstName, u.lastName));
  }
  
  isAuthor(post) {
    return post.authorId === localStorage.getItem('userId');
  }

  isLoggedIn() {
    let authtoken : string = localStorage.getItem('authtoken');
    return !!localStorage.getItem('authtoken');
    /* TODO: FIX THIS LATER!!!!!!! */
    //return authtoken === this.currentAuthtoken;
  }

  logout() {
    return this.http.post(logoutUrl, {}, 'Kinvey');
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value : string) {
    this.currentAuthtoken = value;
  }

}
