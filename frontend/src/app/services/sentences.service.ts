import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SentenceDeep} from '../model/input/sentenceDeep';
import {Sentence} from '../model/sentence';
import {map, Observable, of} from 'rxjs';
import {DataCacheService} from './data-cache.service';

@Injectable({
    providedIn: 'root'
})
export class SentencesService {
    protected http = inject(HttpClient);
    cache = inject(DataCacheService);

    protected makeShallow(sd: SentenceDeep): Sentence {
        // TODO: This is commented out to test dealing with cache misses, revert after done.
        // this.cache.words.setMany(sd.words, "id");
        // this.cache.words.set(sd.focus.id, sd.focus);
        // this.cache.sentences.setMany(sd.translations, "id");
        // this.cache.words.setMany(sd.definitionOf, "id");
        return {
            ...sd,
            words: sd.words.map(w => w.id),
            focus: sd.focus !== null ? sd.focus.id : null,
            translations: sd.translations.map(s => s.id),
            definitionOf: sd.definitionOf.map(w => w.id),
        };
    }

    // get(id: Sentence["id"]): Observable<Sentence> {
    //     return this.http.get<SentenceDeep>(`/api/sentences/${id}`).pipe(
    //         map(sd => {
    //             let s = this.makeShallow(sd);
    //             this.cache.sentences.set(s.id, s);
    //             return s;
    //         })
    //     );
    // }
    //
    // getCached(id: Sentence["id"]): Observable<Sentence> {
    //     let s = this.cache.sentences.get(id);
    //     if (s === undefined) {
    //         return this.get(id);
    //     } else {
    //         return of(s);
    //     }
    // }
    get(id: Sentence["id"], refreshCache: boolean = false): Observable<Sentence> {
        let s = this.cache.sentences.get(id);
        if (s === undefined || refreshCache) {
            return this.http.get<SentenceDeep>(`/api/v1/sentence/${id}`).pipe(
                map(sd => {
                    let s = this.makeShallow(sd);
                    this.cache.sentences.set(s.id, s);
                    return s;
                })
            );
        } else {
            return of(s);
        }
    }

    getAll(): Observable<Sentence[]> {
        return this.http.get<SentenceDeep[]>(`/api/v1/sentence`).pipe(
            map(sds => {
                return sds.map(sd => {
                    let s = this.makeShallow(sd);
                    this.cache.sentences.set(s.id, s);
                    return s;
                });
            })
        );
    }

}
