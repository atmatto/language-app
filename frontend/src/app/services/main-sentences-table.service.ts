import {inject, Injectable} from '@angular/core';
import {Sentence} from '../model/sentence';
import {SentencesService} from './sentences.service';

@Injectable({
    providedIn: 'root'
})
export class MainSentencesTableService {
    protected sentencesService = inject(SentencesService);

    protected sentenceIds?: Sentence["id"][] = undefined;

    constructor() {
        this.sentencesService.getAll().subscribe({
            next: ss => {
                this.sentenceIds = ss.map(s => s.id);
            }
        });
    }

    getIds() {
        return this.sentenceIds;
    }
}
