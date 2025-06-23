import {inject, Injectable} from '@angular/core';
import {WordsService} from './words.service';
import {Word} from '../model/word';

@Injectable({
    providedIn: 'root'
})
export class MainWordsTableService {
    protected wordsService = inject(WordsService);

    protected wordIds?: Word["id"][] = undefined;
    protected searchQuery: string = "";
    protected sortField: string = "";

    constructor() {
        this.refresh();
    }

    protected refresh() {
        this.wordsService.getAll(this.searchQuery, this.sortField).subscribe({
            next: ws => {
                this.wordIds = ws.map(w => w.id);
            }
        });
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
        this.refresh();
    }

    setSortField(field: string) {
        this.sortField = field;
        this.refresh();
    }

    getIds() {
        return this.wordIds;
    }
}
