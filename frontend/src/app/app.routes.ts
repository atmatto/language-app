import { Routes } from '@angular/router';
import {ErrorPage} from './components/general/error-page/error-page.component';
import {IndexComponent} from './components/pages/index/index.component';
import {CorpusBrowserComponent} from './components/pages/corpus/corpus-browser/corpus-browser.component';

export const routes: Routes = [
    {path: "corpus/words", component: CorpusBrowserComponent, data: {browserMode: "words"}},
    {path: "corpus/sentences", component: CorpusBrowserComponent, data: {browserMode: "sentences"}},
    // {path: "corpus/word/:wordId", component: WordPageComponent},
    // {path: "corpus/sentence/:sentenceId", component: SentencePageComponent},
    {path: "corpus", redirectTo: "corpus/sentences"},
    {path: "", component: IndexComponent},
    {path: "**", component: ErrorPage, data: {title: "Page not found", subtitle: "We could not find the page you were looking for."}}
];
