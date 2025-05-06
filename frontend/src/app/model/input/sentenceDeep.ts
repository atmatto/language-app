import {Word} from '../word';
import {Content} from '../content';
import {Sentence} from '../sentence';

export interface SentenceDeep extends Content {
    words: Word[];
    focus: Word | null;
    translations: Sentence[];
    definitionOf: Word[];
    attribution: string;
}
