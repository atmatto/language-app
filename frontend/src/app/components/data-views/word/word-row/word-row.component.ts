import {Component, ElementRef, inject, input, SimpleChanges} from '@angular/core';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {WordComponent} from '../word.component';
import {WordSimpleComponent} from "../word-simple/word-simple.component";
import {SentenceSimpleComponent} from "../../sentence/sentence-simple/sentence-simple.component";
import {LanguageSimpleComponent} from "../../language/language-simple/language-simple.component";

@Component({
    selector: 'tbody[app-word-row], thead[app-word-row]',
    imports: [
        SkeletonPlaceholderComponent,
        WordSimpleComponent,
        SentenceSimpleComponent,
        LanguageSimpleComponent
    ],
    templateUrl: './word-row.component.html',
    styleUrl: './word-row.component.css',
})
export class WordRowComponent extends WordComponent {
    // TODO: Clean up commented-out members.
    // protected wordsService = inject(WordsService);
    // protected sentencesService = inject(SentencesService); // TODO: Shouldn't sentences be displayed using their own components?

    protected host: ElementRef<HTMLTableSectionElement> = inject(ElementRef);
    protected isHeader = false;
    // wordId = input<Word["id"]>();
    extended = input<boolean>(false);

    // protected words = new ComponentStore<Word["id"], Word>();
    // protected sentences = signal<{[id: Sentence["id"]]: Sentence}>({});

    // protected destroyRef = inject(DestroyRef);
    // protected cancelRequests = new Subject<void>();

    ngOnInit() {
        this.isHeader = this.host.nativeElement.tagName.toLowerCase() == "thead";
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (!this.isHeader) {
        //     if (changes["wordId"].previousValue != changes["wordId"].currentValue) {
        //         console.warn("Word id changed"); // TODO: test if it works as it should
        //         this.cancelRequests.next();
        //         this.words.clear();
        //         this.sentences.set({});
        //     }
        //     this.refresh();
        // }
    }

    // protected refresh() {
    //     let id = this.wordId();
    //     if (id !== undefined) {
    //         this.wordsService.get(id).pipe(
    //             takeUntilDestroyed(this.destroyRef),
    //             takeUntil(this.cancelRequests)
    //         ).subscribe({
    //             next: w => {
    //                 this.words.set(w.id, w);
    //
    //                 let words = new Set<Word["id"]>();
    //                 if (w.base !== null)
    //                     words.add(w.base);
    //                 w.forms.forEach(w => words.add(w));
    //                 words.forEach(id => this.wordsService.get(id).pipe(
    //                     takeUntilDestroyed(this.destroyRef),
    //                     takeUntil(this.cancelRequests)
    //                 ).subscribe({
    //                     next: w => {
    //                         this.words.set(w.id, w);
    //                     }
    //                 }));
    //
    //                 let sentences = new Set<Sentence["id"]>();
    //                 w.definitions.forEach(s => sentences.add(s));
    //                 w.examples.forEach(s => sentences.add(s));
    //                 sentences.forEach(id => this.sentencesService.getCached(id).pipe(
    //                     takeUntilDestroyed(this.destroyRef),
    //                     takeUntil(this.cancelRequests)
    //                 ).subscribe({
    //                     next: s => {
    //                         this.sentences.update(sentences => ({...sentences, [s.id]: s}));
    //                     }
    //                 }));
    //             }
    //         })
    //     }
    // }

    // protected getThisWord(): Word | undefined {
    //     let id = this.wordId();
    //     if (id === undefined)
    //         return undefined;
    //     return this.words.get(id);
    // }
    //
    // protected getWord(id: Word["id"] | null): Word | null | undefined {
    //     if (id === null)
    //         return null;
    //     return this.words.get(id);
    // }
    //
    // protected getSentence(id: Sentence["id"]): Sentence | undefined {
    //     return this.sentences()[id];
    // }
    //
    // protected getDefinitions(): Sentence["id"][] | undefined {
    //     // TODO: filter/sort
    //     let word = this.getThisWord();
    //     if (word === undefined)
    //         return undefined;
    //     return word.definitions;
    // }
}
