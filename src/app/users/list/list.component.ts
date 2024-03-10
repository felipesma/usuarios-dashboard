import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  users: User[] = [];
  users$!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
  }
}
