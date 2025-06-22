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
        this.wordsService.getAll().subscribe({
            next: ws => {
                if (this.searchQuery.length !== 0) {
                    let query = this.searchQuery.toLowerCase();
                    ws = ws.filter(w => w.text.toLowerCase().includes(query));
                }
                if (this.sortField.length !== 0) {
                    const reversed = this.sortField.startsWith("!");
                    const field = reversed ? this.sortField.substring(1) : this.sortField;
                    switch (field) {
                        case "text":
                            ws = ws.sort((a, b) => {
                                return (reversed ? -1 : 1) * a.text.localeCompare(b.text, undefined, {sensitivity: "base"});
                            });
                            break;
                        case "occurrences":
                            ws = ws.sort((a, b) => {
                                return (reversed ? -1 : 1) * (a.examples.length - b.examples.length);
                            });
                            break;
                        default:
                            console.error("Unknown sort field", this.sortField);
                            break;
                    }
                }
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
