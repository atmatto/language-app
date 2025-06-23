import {Word} from '../word';
import {Sentence} from '../sentence';
import {ContentDeep} from './contentDeep';

export interface SentenceDeep extends ContentDeep {
    words: Word[];
    focus: Word | null;
    translations: Sentence[];
    definitionOf: Word[];
    attribution: string;
}
