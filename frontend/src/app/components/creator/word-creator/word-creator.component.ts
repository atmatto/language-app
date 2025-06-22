import {Component, DestroyRef, ElementRef, inject, input, signal} from '@angular/core';
import {Dialog, OverlaysService} from '../../../services/overlays.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Language} from '../../../model/language';
import {FormsModule} from '@angular/forms';
import {LanguagePickerComponent} from '../../picker/language-picker/language-picker.component';
import {WordsService} from '../../../services/words.service';
import {Provenance} from '../../../model/provenance';
import {Word} from '../../../model/word';
import {EditorsService} from '../../../services/editors.service';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
  selector: 'app-word-creator',
    imports: [
        FormsModule,
        LanguagePickerComponent,
        SkeletonPlaceholderComponent
    ],
  templateUrl: './word-creator.component.html',
  styleUrl: './word-creator.component.css'
})
export class WordCreatorComponent {
    protected wordsService = inject(WordsService);
    protected editorsService = inject(EditorsService);
    protected overlaysService = inject(OverlaysService);

    protected destroyRef = inject(DestroyRef);
    protected host: ElementRef<HTMLElement> = inject(ElementRef);

    dialog = input<Dialog>();
    wordPrototype = input<Partial<Word>>({});

    protected language = signal<Language["id"] | undefined>(undefined);
    protected text = signal<string>("");
    protected submitted = signal(false);

    ngOnInit() {
        let d = this.dialog();
        if (d !== undefined) {
            d.closeRequested.pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => d.remove.next());
            // this.host.nativeElement.parentElement?.classList.add("fullwidth");
        }
    }

    protected submit() {
        console.log("Create word", this.language(), this.text()); // TODO
        if (this.submitted()) {
            return;
        }

        this.submitted.set(true);
        this.wordsService.create({
            ...this.wordPrototype(),
            language: this.language(),
            text: this.text(),
            provenance: Provenance.Manual,
        }).subscribe({
            error: err => {
                if (err.status === 0) {
                    this.overlaysService.openSimpleAlert("Failed to create word", "No connection");
                } else {
                    switch (err.error?.id) {
                        default:
                            this.overlaysService.openSimpleAlert("Failed to create word", "Unexpected error");
                            console.error("Unhandled error:", err.error);
                            break;
                    }
                }
                this.submitted.set(false);
            },
            next: w => {
                this.dialog()?.remove.next();
                this.editorsService.editWord(w.id);
            }
        });
    }

    protected cancel() {
        this.dialog()?.remove.next();
    }
}
