import {inject, Injectable} from '@angular/core';
import {OverlaysService} from './overlays.service';
import {WordPageComponent} from '../components/data-views/word/word-page/word-page.component';
import {Word} from '../model/word';
import {Sentence} from '../model/sentence';
import {SentencePageComponent} from '../components/data-views/sentence/sentence-page/sentence-page.component';
import {WordCreatorComponent} from '../components/creator/word-creator/word-creator.component';
import {LanguageEditorComponent} from '../components/creator/language-editor/language-editor.component';
import {Language} from '../model/language';
import {WordEditorComponent} from '../components/creator/word-editor/word-editor.component';

@Injectable({
    providedIn: 'root'
})
export class EditorsService {
    protected overlays = inject(OverlaysService);

    showWord(id: Word["id"]): void {
        this.overlays.openDialog(WordPageComponent, {wordId: id});
    }

    editWord(id: Word["id"]): void {
        this.overlays.openDialog(WordEditorComponent, {wordId: id});
    }

    createWord(wordPrototype?: Partial<Word>): void {
        this.overlays.openDialog(WordCreatorComponent, wordPrototype !== undefined ? {wordPrototype} : {});
    }

    showSentence(id: Sentence["id"]): void {
        this.overlays.openDialog(SentencePageComponent, {sentenceId: id});
    }

    createLanguage(): void {
        this.overlays.openDialog(LanguageEditorComponent, {});
    }

    editLanguage(id: Language["id"]): void {
        this.overlays.openDialog(LanguageEditorComponent, {languageId: id});
    }
}
