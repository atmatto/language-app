import {Word} from './word';
import {Content} from './content';

export interface Sentence extends Content {
    words: Word["id"][];
    focus: Word["id"] | null; // TODO: Should focus also reference a definition? Or do we assume that words with multiple meanings are rare...
    translations: Sentence["id"][];
    definitionOf: Word["id"][];
    attribution: string;
}
