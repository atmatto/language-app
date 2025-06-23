import {Sentence} from '../sentence';
import {Word} from '../word';
import {ContentRequest} from './contentRequest';

export interface WordRequest extends ContentRequest {
    base: Word["id"] | null;
    forms: Word["id"][];
    definitions: Sentence["id"][];
    examples: Sentence["id"][];
}
