import {inject, Injectable, signal} from '@angular/core';
import {Language} from '../model/language';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguagesService {
    protected http = inject(HttpClient);

    protected languages = signal<Record<Language["id"], Language>>({});

    constructor() {
        this.http.get<Language[]>("/api/v1/language").subscribe({
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

    getLanguages(): Language[] {
        return Object.values(this.languages());
    }

    getIds(): Language["id"][] {
        return Object.values(this.languages()).map(l => l.id);
    }

    getLanguage(lang: Language["id"]): Language | undefined {
        return this.languages()[lang];
    }

    create(language: Partial<Language>): Observable<Language> {
        return this.http.post<Language>("/api/v1/language", language).pipe(
            map(l => {
                this.languages.update(o => ({...o, [l.id]: l}));
                return l;
            })
        );
    }

    update(id: Language["id"], language: Partial<Language>): Observable<Language> {
        return this.http.patch<Language>(`/api/v1/language/${id}`, language).pipe(
            map(l => {
                this.languages.update(o => ({...o, [l.id]: l}));
                return l;
            })
        );
    }

    delete(lang: Language["id"]): Observable<void> {
        return this.http.delete<void>(`/api/v1/language/${lang}`).pipe(
            map(() => {
                this.languages.update(o => {
                    delete o[lang];
                    return o;
                })
            })
        )
    }
}
