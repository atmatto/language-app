import {inject, Injectable} from '@angular/core';
import {Sentence} from '../model/sentence';
import {SentencesService} from './sentences.service';

@Injectable({
    providedIn: 'root'
})
export class MainSentencesTableService {
    protected sentencesService = inject(SentencesService);

    protected sentenceIds?: Sentence["id"][] = undefined;
    protected searchQuery: string = "";
    protected sortField: string = "";

    constructor() {
        this.refresh();
    }

    protected refresh() {
        this.sentencesService.getAll().subscribe({
            next: ss => {
                if (this.searchQuery.length !== 0) {
                    let query = this.searchQuery.toLowerCase();
                    ss = ss.filter(s => s.text.toLowerCase().includes(query));
                }
                if (this.sortField.length !== 0) {
                    const reversed = this.sortField.startsWith("!");
                    const field = reversed ? this.sortField.substring(1) : this.sortField;
                    switch (field) {
                        case "text":
                            ss = ss.sort((a, b) => {
                                return (reversed ? -1 : 1) * a.text.localeCompare(b.text, undefined, {sensitivity: "base"});
                            });
                            break;
                        default:
                            console.error("Unknown sort field", this.sortField);
                            break;
                    }
                }
                this.sentenceIds = ss.map(s => s.id);
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
        return this.sentenceIds;
    }
}
