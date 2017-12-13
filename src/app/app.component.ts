import { Component, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AuthenticationService } from './core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
    authService: AuthenticationService
  ) { 
    this.toastr.setRootViewContainerRef(vcr);  
  }
}
