import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  name: string = '';

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.statusUpdate.subscribe(
      response => {
        this.setStatus();
      }
    );
  }

  setStatus() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.name = this.authService.name;
  }

  ngOnInit(): void {
    this.setStatus();
  }

  onAuth() {
    this.authService.signOut();
    this.router.navigate(['home'])
  }

}
