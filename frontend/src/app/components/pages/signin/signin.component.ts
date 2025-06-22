import {Component, effect, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {OverlaysService} from '../../../services/overlays.service';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
  selector: 'app-signin',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        SkeletonPlaceholderComponent
    ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
    protected router = inject(Router);

    protected authService = inject(AuthService);
    protected overlaysService = inject(OverlaysService);

    protected submitted = signal(false);

    constructor() {
        effect(() => {
            if (this.authService.getCurrentUserId() !== null) {
                this.router.navigateByUrl("/");
            }
        })
    }

    protected submit({username, password}: {username: string, password: string}) {
        if (this.submitted()) {
            return;
        }

        this.submitted.set(true);
        this.authService.signIn(username, password).subscribe({
            error: err => {
                if (err.status === 0) {
                    this.overlaysService.openSimpleAlert("Failed to sign in", "No connection");
                } else {
                    switch (err.error?.id) {
                        case "AUTH":
                            this.overlaysService.openSimpleAlert("Failed to sign in", err.error.reason ?? "Unknown authentication error");
                            break;
                        default:
                            this.overlaysService.openSimpleAlert("Failed to sign in", "Unexpected error");
                            console.error("Unhandled error:", err.error);
                            break;
                    }
                }
                this.submitted.set(false);
            }
        });
    }
}
