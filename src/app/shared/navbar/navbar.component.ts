import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  searchUser(idUser: string) {
    if (!idUser) return;
    this.router.navigate(['/user',idUser])
  }

}
