import {inject, Injectable} from '@angular/core';
import {Word} from '../model/word';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, Subject} from 'rxjs';
import {WordDeep} from '../model/input/wordDeep';
import {DataCacheService} from './data-cache.service';
import {hpMakeShallow} from '../model/input/historyPropertyDeep';
import {Language} from '../model/language';
import {WordRequest} from '../model/output/wordRequest';

@Injectable({
    providedIn: 'root'
})
export class WordsService {
    protected http = inject(HttpClient);
    cache = inject(DataCacheService);

    protected makeShallow(wd: WordDeep): Word {
        // TODO: This is commented out to test dealing with cache misses, revert after done.
        // if (wd.base !== null)
        //     this.cache.words.set(wd.base.id, wd.base);
        // this.cache.words.setMany(wd.forms, "id");
        // this.cache.sentences.setMany(wd.definitions, "id");
        // this.cache.sentences.setMany(wd.examples, "id");
        return {
            ...wd,
            base: wd.base !== null ? wd.base.id : null,
            forms: wd.forms.map(w => w.id),
            definitions: wd.definitions.map(s => s.id),
            examples: wd.examples.map(s => s.id),
            created: hpMakeShallow(wd.created, this.cache.users),
            modified: hpMakeShallow(wd.modified, this.cache.users),
            reviewed: wd.reviewed !== null ? hpMakeShallow(wd.reviewed, this.cache.users) : null,
        };
    }

    get(id: Word["id"], refreshCache: boolean = false): Observable<Word> {
        let w = this.cache.words.get(id);
        if (w === undefined || refreshCache) {
            return this.http.get<WordDeep>(`/api/v1/word/${id}`).pipe(
                map(wd => {
                    let w = this.makeShallow(wd);
                    this.cache.words.set(w.id, w);
                    return w;
                })
            );
        } else {
            return of(w);
        }
    }

    getAll(searchQuery?: string, sortField?: string): Observable<Word[]> {
        const query = searchQuery?.toLowerCase();
        return this.http.get<WordDeep[]>(`/api/v1/word`).pipe(
            map(wds => {
                let ws = wds.map(wd => {
                    let w = this.makeShallow(wd);
                    this.cache.words.set(w.id, w);
                    return w;
                });
                if (query !== undefined && query.length !== 0) {
                    ws = ws.filter(w => w.text.toLowerCase().includes(query));
                }
                if (sortField !== undefined && sortField.length !== 0) {
                    const reversed = sortField.startsWith("!");
                    const field = reversed ? sortField.substring(1) : sortField;
                    switch (field) {
                        case "text":
                            ws = ws.sort((a, b) => {
                                return (reversed ? -1 : 1) * a.text.localeCompare(b.text, undefined, {sensitivity: "base"});
                            });
                            break;
                        case "occurrences":
                            ws = ws.sort((a, b) => {
                                return (reversed ? -1 : 1) * (a.examples.length - b.examples.length);
                            });
                            break;
                        default:
                            console.error("Unknown sort field", sortField);
                            break;
                    }
                }
                return ws;
            })
        );
    }

    create(word: Partial<Word>): Observable<Word> {
        return this.http.post<WordDeep>("/api/v1/word", word).pipe(
            map(wd => {
                let w = this.makeShallow(wd);
                this.cache.words.set(w.id, w);
                return w;
            })
        );
    }

    update(id: Word["id"], word: Partial<WordRequest>): Observable<Word> {
        return this.http.patch<WordDeep>(`/api/v1/word/${id}`, word).pipe(
            map(wd => {
                let w = this.makeShallow(wd);
                this.cache.words.set(w.id, w);
                return w;
            })
        );
    }

    delete(word: Word["id"]): Observable<void> {
        return this.http.delete<void>(`/api/v1/word/${word}`).pipe(
            map(() => {
                // TODO: Update references
                this.cache.words.delete(word);
            })
        )
    }
}
