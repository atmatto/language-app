import {Language} from './language';
import {HistoryProperty} from './history-property';
import {Provenance} from './provenance';

export interface Content {
    id: number;
    language: Language["id"];
    text: string;
    note: string;

    provenance: Provenance;
    ignored: boolean;
    created: HistoryProperty;
    modified: HistoryProperty;
    reviewed: HistoryProperty | null;
}
