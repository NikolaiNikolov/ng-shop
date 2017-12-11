import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';
const now = new Date();

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService : AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(e) {
    e.preventDefault();

    this.authService.logout()
    .subscribe(data => {
      localStorage.clear();
      this.router.navigate(['/login']);
    })
  }

}