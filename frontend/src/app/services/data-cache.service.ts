import { Injectable } from '@angular/core';
import {MemStore} from '../lib/mem-store';
import {Sentence} from '../model/sentence';
import {Word} from '../model/word';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
    sentences = new MemStore<Sentence["id"], Sentence>();
    words = new MemStore<Word["id"], Word>();
}
