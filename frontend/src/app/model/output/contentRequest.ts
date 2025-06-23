import {Language} from '../language';
import {Provenance} from '../provenance';

export interface ContentRequest {
    // id: number;
    language: Language["id"];
    text: string;
    note: string;

    provenance: Provenance;
    ignored: boolean;
    reviewed: boolean;
}
