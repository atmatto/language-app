import {Component, DestroyRef, effect, inject, input, signal} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Sentence} from '../../../model/sentence';
import {SentencesService} from '../../../services/sentences.service';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';
import {LanguagesService} from '../../../services/languages.service';

@Component({
    selector: 'app-sentence',
    templateUrl: './sentence.component.html',
    styleUrl: './sentence.component.css'
})
export class SentenceComponent {
    protected readonly JSON = JSON;

    protected sentencesService = inject(SentencesService);
    protected languagesService = inject(LanguagesService);

    sentenceId = input<Sentence["id"]>();
    protected sentence = signal<Sentence | undefined>(undefined);

    protected destroyRef = inject(DestroyRef);
    protected cancelRequests = new Subject<void>(); // TODO: Is there a cleaner way to handle this?

    constructor() {
        effect(() => {
            this.sentenceId();
            this.cancelRequests.next();
            this.sentence.set(undefined);
            this.refresh();
        });
        this.sentencesService.cache.sentences.changed.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(s => { if (s == this.sentenceId()) this.refresh(); });
    }

    protected refresh() {
        let id = this.sentenceId();
        if (id !== undefined) {
            this.sentencesService.get(id).pipe(
                takeUntilDestroyed(this.destroyRef),
                takeUntil(this.cancelRequests)
            ).subscribe({
                next: s => this.sentence.set(s)
            })
        }
    }
}
