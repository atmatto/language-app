import {inject, Injectable, signal} from '@angular/core';
import {Language} from '../model/language';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LanguagesService {
    protected http = inject(HttpClient);

    protected languages = signal<Record<Language["id"], Language>>({});

    constructor() {
        this.http.get<Language[]>("/api/languages").subscribe({
            next: ls => ls.forEach(l => this.languages.update(o => ({...o, [l.id]: l})))
        });
        // TODO: Handle error and retry
    }

    getIcon(lang: Language["id"]): string {
        return this.languages()[lang]?.icon;
    }

    getName(lang: Language["id"]): string {
        return this.languages()[lang]?.name;
    }
}
