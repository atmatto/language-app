import {Language} from '../language';
import {HistoryPropertyDeep} from './historyPropertyDeep';
import {Provenance} from '../provenance';

export interface ContentDeep {
    id: number;
    language: Language["id"];
    text: string;
    note: string;

    provenance: Provenance;
    ignored: boolean;
    created: HistoryPropertyDeep;
    modified: HistoryPropertyDeep;
    reviewed: HistoryPropertyDeep | null;
}
