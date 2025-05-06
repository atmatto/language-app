import {Sentence} from './sentence';
import {Content} from './content';

export interface Word extends Content {
    base: Word["id"] | null;
    forms: Word["id"][];
    definitions: Sentence["id"][];
    examples: Sentence["id"][];
}
