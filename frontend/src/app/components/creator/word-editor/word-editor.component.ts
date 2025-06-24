import {Component, DestroyRef, effect, ElementRef, forwardRef, inject, input, signal} from '@angular/core';
import {Dialog, OverlaysService} from '../../../services/overlays.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';
import {WordsService} from '../../../services/words.service';
import {Word} from '../../../model/word';
import {Provenance} from '../../../model/provenance';
import {LanguagePickerComponent} from '../../picker/language-picker/language-picker.component';
import {SentencesTableComponent} from '../../data-views/sentences-table/sentences-table.component';
import {WordsTableComponent} from '../../data-views/words-table/words-table.component';
import {ProvenanceInputComponent} from '../../data-views/provenance/provenance-input/provenance-input.component';

@Component({
  selector: 'app-word-editor',
    imports: [
        FormsModule,
        SkeletonPlaceholderComponent,
        LanguagePickerComponent,
        forwardRef(() => SentencesTableComponent),
        forwardRef(() => WordsTableComponent),
        ProvenanceInputComponent,
    ],
  templateUrl: './word-editor.component.html',
  styleUrl: './word-editor.component.css'
})
export class WordEditorComponent {
    protected wordsService = inject(WordsService);
    protected overlaysService = inject(OverlaysService);

    protected destroyRef = inject(DestroyRef);
    protected host: ElementRef<HTMLElement> = inject(ElementRef);

    dialog = input<Dialog>();
    wordId = input<Word["id"]>();

    protected id = signal<Word["id"] | undefined>(undefined);
    protected base = signal<Word["base"]>(null);
    protected forms = signal<Word["forms"]>([]);
    protected definitions = signal<Word["definitions"]>([]);
    protected examples = signal<Word["examples"]>([]);
    protected language = signal<Word["language"]>(-1);
    protected text = signal<Word["text"]>("");
    protected note = signal<Word["note"]>("");
    protected provenance = signal<Word["provenance"]>(Provenance.Manual);
    protected ignored = signal<Word["ignored"]>(false);
    protected reviewed = signal<boolean>(false);

    protected submitted = signal(false);

    constructor() {
        effect(() => {
            console.log("we lang", this.language());
        });
    }

    ngOnInit() {
        let d = this.dialog();
        if (d !== undefined) {
            d.closeRequested.pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => d.remove.next());
            this.host.nativeElement.parentElement?.classList.add("fullwidth");
        }
        // effect(() => {
        const id = this.wordId();
        if (id !== undefined) {
            const w = this.wordsService.get(id).subscribe({
                error: err => {
                    if (err.status === 0) {
                        this.overlaysService.openSimpleAlert("Failed to load word", "No connection");
                    } else {
                        switch (err.error?.id) {
                            default:
                                this.overlaysService.openSimpleAlert("Failed to load word", "Unexpected error");
                                console.error("Unhandled error:", err.error);
                                break;
                        }
                    }
                    this.dialog()?.remove.next();
                },
                next: w => {
                    this.base.set(w.base);
                    this.forms.set(w.forms);
                    this.definitions.set(w.definitions);
                    this.examples.set(w.examples);
                    this.language.set(w.language);
                    this.text.set(w.text);
                    this.note.set(w.note);
                    this.provenance.set(w.provenance);
                    this.ignored.set(w.ignored);
                    this.reviewed.set(w.reviewed !== null);
                    this.id.set(w.id);
                }
            });
        }
        // })
    }

    protected submit() {
        if (this.submitted()) {
            return;
        }

        this.submitted.set(true);
        const id = this.id();
        if (id !== undefined) {
            this.wordsService.update(id, {
                base: this.base(),
                forms: this.forms(),
                definitions: this.definitions(),
                examples: this.examples(),
                language: this.language(),
                text: this.text(),
                note: this.note(),
                provenance: this.provenance(),
                ignored: this.ignored(),
                reviewed: this.reviewed(),
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
                next: l => {
                    this.dialog()?.remove.next();
                }
            });
        }
        // else {
        //     this.wordsService.update(id, {
        //         icon: this.icon(),
        //         code: this.code(),
        //         name: this.name(),
        //     }).subscribe({
        //         error: err => {
        //             if (err.status === 0) {
        //                 this.overlaysService.openSimpleAlert("Failed to update language", "No connection");
        //             } else {
        //                 switch (err.error?.id) {
        //                     default:
        //                         this.overlaysService.openSimpleAlert("Failed to update language", "Unexpected error");
        //                         console.error("Unhandled error:", err.error);
        //                         break;
        //                 }
        //             }
        //             this.submitted.set(false);
        //         },
        //         next: l => {
        //             this.dialog()?.remove.next();
        //         }
        //     });
        // }
    }

    protected deleteWord() {
        const id = this.id();
        if (id !== undefined) {
            if (this.submitted()) {
                return;
            }
            this.submitted.set(true);

            this.wordsService.delete(id).subscribe({
                error: err => {
                    if (err.status === 0) {
                        this.overlaysService.openSimpleAlert("Failed to delete word", "No connection");
                    } else {
                        switch (err.error?.id) {
                            default:
                                this.overlaysService.openSimpleAlert("Failed to delete word", "Unexpected error");
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
