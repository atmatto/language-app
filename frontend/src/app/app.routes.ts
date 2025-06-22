import { Routes } from '@angular/router';
import {ErrorPage} from './components/general/error-page/error-page.component';
import {IndexComponent} from './components/pages/index/index.component';
import {CorpusBrowserComponent} from './components/pages/corpus/corpus-browser/corpus-browser.component';
import {SigninComponent} from './components/pages/signin/signin.component';
import {RegisterComponent} from './components/pages/register/register.component';
import {SignoutComponent} from './components/pages/signout/signout.component';
import {UserPageComponent} from './components/data-views/user/user-page/user-page.component';
import {AdminComponent} from './components/admin/admin.component';

export const routes: Routes = [
    {path: "signin", component: SigninComponent},
    {path: "register", component: RegisterComponent},
    {path: "signout", component: SignoutComponent},
    {path: "corpus/words", component: CorpusBrowserComponent, data: {browserMode: "words"}},
    {path: "corpus/sentences", component: CorpusBrowserComponent, data: {browserMode: "sentences"}},
    {path: "user/:userId", component: UserPageComponent}, // TODO: Make sure user ids cannot be negative (restart backend without cleaning the database and check).
    {path: "admin", component: AdminComponent},
    {path: "admin/:subpage", component: AdminComponent},
    // {path: "corpus/word/:wordId", component: WordPageComponent},
    // {path: "corpus/sentence/:sentenceId", component: SentencePageComponent},
    {path: "corpus", redirectTo: "corpus/sentences"},
    {path: "", component: IndexComponent},
    {path: "**", component: ErrorPage, data: {title: "Page not found", subtitle: "We could not find the page you were looking for."}}
];
