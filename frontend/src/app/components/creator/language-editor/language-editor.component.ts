import {Component, DestroyRef, effect, ElementRef, inject, input, signal} from '@angular/core';
import {Dialog, OverlaysService} from '../../../services/overlays.service';
import {Language} from '../../../model/language';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LanguagesService} from '../../../services/languages.service';
import {FormsModule} from '@angular/forms';
import {LanguagePickerComponent} from '../../picker/language-picker/language-picker.component';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
  selector: 'app-language-editor',
    imports: [
        FormsModule,
        SkeletonPlaceholderComponent
    ],
  templateUrl: './language-editor.component.html',
  styleUrl: './language-editor.component.css'
})
export class LanguageEditorComponent {
    protected languagesService = inject(LanguagesService);
    protected overlaysService = inject(OverlaysService);

    protected destroyRef = inject(DestroyRef);
    protected host: ElementRef<HTMLElement> = inject(ElementRef);

    dialog = input<Dialog>();
    languageId = input<Language["id"]>();

    protected id = signal<Language["id"] | undefined>(undefined);
    protected icon = signal<string>("");
    protected code = signal<string>("");
    protected name = signal<string>("");
    protected submitted = signal(false);

    ngOnInit() {
        let d = this.dialog();
        if (d !== undefined) {
            d.closeRequested.pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => d.remove.next());
            // this.host.nativeElement.parentElement?.classList.add("fullwidth");
        }
        // effect(() => {
        const id = this.languageId();
        if (id !== undefined) {
            const l = this.languagesService.getLanguage(id);
            if (l !== undefined) {
                this.id.set(l.id);
                this.icon.set(l.icon);
                this.code.set(l.code);
                this.name.set(l.name);
            }
        }
        // })
    }

    protected submit() {
        if (this.submitted()) {
            return;
        }

        this.submitted.set(true);
        const id = this.id();
        if (id === undefined) {
            this.languagesService.create({
                icon: this.icon(),
                code: this.code(),
                name: this.name(),
            }).subscribe({
                error: err => {
                    if (err.status === 0) {
                        this.overlaysService.openSimpleAlert("Failed to create language", "No connection");
                    } else {
                        switch (err.error?.id) {
                            default:
                                this.overlaysService.openSimpleAlert("Failed to create language", "Unexpected error");
                                console.error("Unhandled error:", err.error);
                                break;
                        }
                    }
                    this.submitted.set(false);
                },
                next: l => {
                    this.dialog()?.remove.next();
                }
            });
        } else {
            this.languagesService.update(id, {
                icon: this.icon(),
                code: this.code(),
                name: this.name(),
            }).subscribe({
                error: err => {
                    if (err.status === 0) {
                        this.overlaysService.openSimpleAlert("Failed to update language", "No connection");
                    } else {
                        switch (err.error?.id) {
                            default:
                                this.overlaysService.openSimpleAlert("Failed to update language", "Unexpected error");
                                console.error("Unhandled error:", err.error);
                                break;
                        }
                    }
                    this.submitted.set(false);
                },
                next: l => {
                    this.dialog()?.remove.next();
                }
            });
        }
    }

    protected deleteLanguage() {
        const id = this.id();
        if (id !== undefined) {
            if (this.submitted()) {
                return;
            }
            this.submitted.set(true);

            this.languagesService.delete(id).subscribe({
                error: err => {
                    if (err.status === 0) {
                        this.overlaysService.openSimpleAlert("Failed to delete language", "No connection");
                    } else {
                        switch (err.error?.id) {
                            case "INTEGRITY":
                                this.overlaysService.openSimpleAlert("Failed to delete language", "Only unused languages can be deleted");
                                break;
                            default:
                                this.overlaysService.openSimpleAlert("Failed to delete language", "Unexpected error");
                                console.error("Unhandled error:", err.error);
                                break;
                        }
                    }
                    this.submitted.set(false);
                },
                next: () => {
                    this.dialog()?.remove.next();
                }
            });
        }
    }

    protected cancel() {
        this.dialog()?.remove.next();
    }

}
