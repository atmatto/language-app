import {Component, effect, inject, input, output, signal} from '@angular/core';
import {Word} from '../../../model/word';
import {WordSimpleComponent} from '../../data-views/word/word-simple/word-simple.component';
import {WordsService} from '../../../services/words.service';
import {WordSimpleRowComponent} from '../../data-views/word/word-simple-row/word-simple-row.component';

@Component({
  selector: 'app-word-mini-search',
    imports: [
        WordSimpleRowComponent
    ],
  templateUrl: './word-mini-search.component.html',
  styleUrl: './word-mini-search.component.css'
})
export class WordMiniSearchComponent {
    protected wordsService = inject(WordsService);

    query = input<string>("");
    protected wordIds = signal<Word["id"][]>([]);
    wordClicked = output<Word["id"]>();

    constructor() {
        effect(() => {
            const query = this.query();
            if (query.length >= 3) {
                this.wordsService.getAll(query, "!occurrences").subscribe({ // TODO: destroyref
                    next: ws => {
                        this.wordIds.set(ws.map(w => w.id));
                    }
                });
            } else {
                this.wordIds.set([]);
            }
        });
    }
}
