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

    getIcon(lang: Language["id"]): string | undefined {
        return this.languages()[lang]?.icon;
    }

    getCode(lang: Language["id"]): string | undefined {
        return this.languages()[lang]?.code;
    }

    getName(lang: Language["id"]): string | undefined {
        return this.languages()[lang]?.name;
    }

    getIds(): Language["id"][] {
        return Object.values(this.languages()).map(l => l.id);
    }
}
