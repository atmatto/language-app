import {inject, Injectable} from '@angular/core';
import {Word} from '../model/word';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, Subject} from 'rxjs';
import {WordDeep} from '../model/input/wordDeep';
import {DataCacheService} from './data-cache.service';

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
        };
    }

    get(id: Word["id"], refreshCache: boolean = false): Observable<Word> {
        let w = this.cache.words.get(id);
        if (w === undefined || refreshCache) {
            return this.http.get<WordDeep>(`/api/words/${id}`).pipe(
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

    getAll(): Observable<Word[]> {
        return this.http.get<WordDeep[]>(`/api/words`).pipe(
            map(wds => {
                return wds.map(wd => {
                    let w = this.makeShallow(wd);
                    this.cache.words.set(w.id, w);
                    return w;
                });
            })
        );
    }
}
