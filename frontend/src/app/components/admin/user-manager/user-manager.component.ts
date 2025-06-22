import {Component, inject} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-user-manager',
    imports: [
        AsyncPipe
    ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent {
    protected usersService = inject(UsersService);

    ngOnInit() {
        this.usersService.getAll().subscribe(); // Load all users to cache. TODO: Temporary
    }
}
