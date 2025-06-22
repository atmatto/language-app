import {inject, Injectable} from '@angular/core';
import {OverlaysService} from './overlays.service';
import {WordPageComponent} from '../components/data-views/word/word-page/word-page.component';
import {Word} from '../model/word';
import {Sentence} from '../model/sentence';
import {SentencePageComponent} from '../components/data-views/sentence/sentence-page/sentence-page.component';
import {WordCreatorComponent} from '../components/creator/word-creator/word-creator.component';

@Injectable({
    providedIn: 'root'
})
export class EditorsService {
    protected overlays = inject(OverlaysService);

    editWord(id: Word["id"]): void {
        this.overlays.openDialog(WordPageComponent, {wordId: id});
    }

    createWord(wordPrototype?: Partial<Word>): void {
        this.overlays.openDialog(WordCreatorComponent, {wordPrototype});
    }

    editSentence(id: Sentence["id"]): void {
        this.overlays.openDialog(SentencePageComponent, {sentenceId: id});
    }
}
