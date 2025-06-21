import {Component, DestroyRef, effect, inject, input, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Subject, takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {User} from '../../../model/user';
import {UsersService} from '../../../services/users.service';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
  selector: 'app-nav-account',
    imports: [
        RouterLink,
        SkeletonPlaceholderComponent
    ],
  templateUrl: './nav-account.component.html',
  styleUrl: './nav-account.component.css'
})
export class NavAccountComponent {
    protected authService = inject(AuthService);
    protected usersService = inject(UsersService);

    protected user = signal<User | undefined | null>(null); // `undefined` means loading

    protected destroyRef = inject(DestroyRef);
    protected cancelRequests = new Subject<void>();

    constructor() {
        effect(() => {
            this.cancelRequests.next();
            if (this.authService.getCurrentUserId() !== null) {
                this.user.set(undefined);
            } else {
                this.user.set(null);
            }
            this.refresh();
        });
        this.usersService.cache.users.changed.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(u => { if (u === this.authService.getCurrentUserId()) this.refresh(); });
    }

    protected refresh() {
        this.authService.getCurrentUser().pipe(
            takeUntilDestroyed(this.destroyRef),
            takeUntil(this.cancelRequests)
        ).subscribe({
            next: u => this.user.set(u)
        });
    }
}
