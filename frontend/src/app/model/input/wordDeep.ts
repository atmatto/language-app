import {Sentence} from '../sentence';
import {Word} from '../word';
import {ContentDeep} from './contentDeep';

export interface WordDeep extends ContentDeep {
    base: Word | null;
    forms: Word[];
    definitions: Sentence[];
    examples: Sentence[];
}
