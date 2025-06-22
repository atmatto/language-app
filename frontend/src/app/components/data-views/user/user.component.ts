import {Component, computed, DestroyRef, effect, inject, input, signal} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../model/user';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent {
    protected readonly JSON = JSON;

    protected usersService = inject(UsersService);
    protected authService = inject(AuthService);

    userId = input<User["id"]>();
    protected user = signal<User | undefined>(undefined);

    protected roles = computed(() => {
        let ans = ["User"];
        const u = this.user();
        if (u === undefined) return ans;
        if (u.reviewer) ans.push("Reviewer");
        if (u.userAdministrator) ans.push("User Administrator");
        if (u.contentAdministrator) ans.push("Content Administrator");
        return ans;
    });

    protected destroyRef = inject(DestroyRef);
    protected cancelRequests = new Subject<void>(); // TODO: Is there a cleaner way to handle this?

    constructor() {
        effect(() => {
            this.userId(); // Make the effect depend on this input
            this.cancelRequests.next();
            this.user.set(undefined);
            this.refresh();
        });
        this.usersService.cache.users.changed.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(u => { if (u === this.userId()) this.refresh(); });
    }

    protected refresh() {
        let id = this.userId();
        if (id !== undefined) {
            this.usersService.get(id).pipe(
                takeUntilDestroyed(this.destroyRef),
                takeUntil(this.cancelRequests)
            ).subscribe({
                next: u => this.user.set(u)
            })
        }
    }
}
