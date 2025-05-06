import {Sentence} from '../sentence';
import {Content} from '../content';
import {Word} from '../word';

export interface WordDeep extends Content {
    base: Word | null;
    forms: Word[];
    definitions: Sentence[];
    examples: Sentence[];
}
