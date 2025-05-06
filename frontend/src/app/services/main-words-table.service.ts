import {inject, Injectable} from '@angular/core';
import {WordsService} from './words.service';
import {Word} from '../model/word';

@Injectable({
    providedIn: 'root'
})
export class MainWordsTableService {
    protected wordsService = inject(WordsService);

    protected wordIds?: Word["id"][] = undefined;

    constructor() {
        this.wordsService.getAll().subscribe({
            next: ws => {
                this.wordIds = ws.map(w => w.id);
            }
        });
    }

    getIds() {
        return this.wordIds;
    }
}
