import {Component, DestroyRef, effect, ElementRef, inject, input, signal, SimpleChanges} from '@angular/core';
import {WordsService} from '../../../services/words.service';
import {SentencesService} from '../../../services/sentences.service';
import {Word} from '../../../model/word';
import {Subject, takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SkeletonPlaceholderComponent} from '../../general/skeleton-placeholder/skeleton-placeholder.component';
import {Sentence} from '../../../model/sentence';
import {LanguagesService} from '../../../services/languages.service';

@Component({
    selector: 'app-word',
    imports: [
        SkeletonPlaceholderComponent
    ],
    templateUrl: './word.component.html',
    styleUrl: './word.component.css'
})
export class WordComponent {
    protected readonly JSON = JSON;

    protected wordsService = inject(WordsService);
    protected languagesService = inject(LanguagesService);

    wordId = input<Word["id"]>();
    protected word = signal<Word | undefined>(undefined);

    protected destroyRef = inject(DestroyRef);
    protected cancelRequests = new Subject<void>(); // TODO: Is there a cleaner way to handle this?

    constructor() {
        effect(() => {
            this.wordId(); // TODO: Test that it detects change of wordId and works as it should.
            this.cancelRequests.next();
            this.word.set(undefined);
            this.refresh();
        });
        this.wordsService.cache.words.changed.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(w => { if (w == this.wordId()) this.refresh(); });
    }

    protected refresh() {
        let id = this.wordId();
        if (id !== undefined) {
            this.wordsService.get(id).pipe(
                takeUntilDestroyed(this.destroyRef),
                takeUntil(this.cancelRequests)
            ).subscribe({
                next: w => this.word.set(w)
            })
        }
    }

    protected getDefinitions(): Sentence["id"][] | undefined {
        // TODO: filter/sort
        return this.word()?.definitions;
    }
}
