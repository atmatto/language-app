import {Component, effect, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';
import {OverlaysService} from '../../../services/overlays.service';

@Component({
  selector: 'app-register',
    imports: [
        FormsModule,
        RouterLink,
        SkeletonPlaceholderComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    protected router = inject(Router);

    protected authService = inject(AuthService);
    protected overlaysService = inject(OverlaysService);

    protected passwordMatchError = signal(false);
    protected submitted = signal(false);

    constructor() {
        effect(() => {
            if (this.authService.getCurrentUserId() !== null) {
                this.router.navigateByUrl("/");
            }
        })
    }

    protected submit({username, password, confirmPassword}: {username: string, password: string, confirmPassword: string}) {
        if (this.submitted()) {
            return;
        }

        if (password !== confirmPassword) {
            this.passwordMatchError.set(true);
        } else {
            this.submitted.set(true);
            this.passwordMatchError.set(false);
            this.authService.register(username, password).subscribe({
                error: err => {
                    if (err.status === 0) {
                        this.overlaysService.openSimpleAlert("Failed to register", "No connection");
                    } else {
                        switch (err.error?.id) {
                            case "INTEGRITY":
                                this.overlaysService.openSimpleAlert("Failed to register", "Username not available");
                                break;
                            default:
                                this.overlaysService.openSimpleAlert("Failed to register", "Unknown error");
                                console.error("Unhandled error:", err.error);
                                break;
                        }
                    }
                    this.submitted.set(false);
                },
                next: () => {
                    this.authService.signIn(username, password).subscribe({
                        error: err => {
                            if (err.status === 0) {
                                this.overlaysService.openSimpleAlert("Registered successfully but failed to sign in", "No connection");
                            } else {
                                switch (err.error?.id) {
                                    case "AUTH":
                                        this.overlaysService.openSimpleAlert("Registered successfully but failed to sign in", err.error.reason ?? "Unknown authentication error");
                                        break;
                                    default:
                                        this.overlaysService.openSimpleAlert("Registered successfully but failed to sign in", "Unknown error");
                                        console.error("Unhandled error:", err.error);
                                        break;
                                }
                            }
                            this.submitted.set(false);
                        }
                    });
                }
            });
        }
    }
}
