import {inject, Injectable} from '@angular/core';
import {LanguagesService} from './languages.service';
import {Language} from '../model/language';

@Injectable({
    providedIn: 'root'
})
export class LanguageManagerService {
    protected languagesService = inject(LanguagesService);

    protected languageIds?: Language["id"][] = undefined;

    getIds() {
        const ids = this.languagesService.getIds();
        if (ids.length === 0)
            return undefined; // TODO: This is ok because it is improbable that there are no languages, but it's not perfect because of this assumption.
        return ids;
    }
}
