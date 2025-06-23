import {inject, Injectable} from '@angular/core';
import {OverlaysService} from './overlays.service';
import {WordPageComponent} from '../components/data-views/word/word-page/word-page.component';
import {Word} from '../model/word';
import {Sentence} from '../model/sentence';
import {SentencePageComponent} from '../components/data-views/sentence/sentence-page/sentence-page.component';
import {WordCreatorComponent} from '../components/creator/word-creator/word-creator.component';
import {LanguageCreatorComponent} from '../components/creator/language-creator/language-creator.component';
import {Language} from '../model/language';

@Injectable({
    providedIn: 'root'
})
export class EditorsService {
    protected overlays = inject(OverlaysService);

    editWord(id: Word["id"]): void {
        this.overlays.openDialog(WordPageComponent, {wordId: id});
    }

    createWord(wordPrototype?: Partial<Word>): void {
        this.overlays.openDialog(WordCreatorComponent, wordPrototype !== undefined ? {wordPrototype} : {});
    }

    editSentence(id: Sentence["id"]): void {
        this.overlays.openDialog(SentencePageComponent, {sentenceId: id});
    }

    createLanguage(): void {
        this.overlays.openDialog(LanguageCreatorComponent, {});
    }

    editLanguage(id: Language["id"]): void {
        this.overlays.openDialog(LanguageCreatorComponent, {languageId: id});
    }
}
