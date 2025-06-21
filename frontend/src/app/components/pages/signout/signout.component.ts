import {Component, effect, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-signout',
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent {
    protected router = inject(Router);

    protected authService = inject(AuthService);

    constructor() {
        if (this.authService.getCurrentUserId() === null) {
            this.router.navigateByUrl("/");
        } else {
            this.authService.signOut();
        }
    }
}
