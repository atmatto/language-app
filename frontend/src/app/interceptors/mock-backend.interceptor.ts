import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {delay, of} from 'rxjs';
import {Sentence} from '../model/sentence';
import {Word} from '../model/word';
import {Language} from '../model/language';
import {Provenance} from '../model/provenance';
import {HistoryProperty} from '../model/history-property';
import {WordDeep} from '../model/input/wordDeep';
import {SentenceDeep} from '../model/input/sentenceDeep';

const hp: HistoryProperty = {user: 99, timestamp: 1234};

const languages: {[key: number]: Language} = {
    1: { id: 1, code: "hu", name: "Hungarian", icon: "🇭🇺" },
    2: { id: 2, code: "en", name: "English", icon: "🇬🇧" },
};

const sentences: {[key: number]: Sentence} = {
    [3]: { id: 3, language: 1, text: "Nézd! Ott egy nyúl.", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp, words: [2, 1, 4, 3], focus: 4, translations: [4], definitionOf: [], attribution: "Revealed in a dream" },
    [4]: { id: 4, language: 2, text: "Look, there's a rabbit!", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [3], definitionOf: [], attribution: "Revealed in a dream" },
    [5]: { id: 5, language: 1, text: "Ez egy gonosz nyúl volt.", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp, words: [5, 3, 6, 4, 7], focus: 6, translations: [6], definitionOf: [], attribution: "Revealed in a dream" },
    [6]: { id: 6, language: 2, text: "That was an evil bunny.", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [5], definitionOf: [], attribution: "Revealed in a dream" },
    [7]: { id: 7, language: 2, text: "(interjection, informal) look", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [1], attribution: "Wiktionary" },
    [8]: { id: 8, language: 2, text: "to look", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [8], attribution: "Wiktionary" },
    [9]: { id: 9, language: 2, text: "to watch", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [8], attribution: "Wiktionary" },
    [10]: { id: 10, language: 2, text: "(demonstrative) there, over there", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [2], attribution: "Wiktionary" },
    [11]: { id: 11, language: 2, text: "one", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [3], attribution: "Wiktionary" },
    [12]: { id: 12, language: 2, text: "a, an (indefinite article)", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [3], attribution: "Wiktionary" },
    [13]: { id: 13, language: 2, text: "same, identical", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [3], attribution: "Wiktionary" },
    [14]: { id: 14, language: 2, text: "rabbit, hare", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [4], attribution: "Wiktionary" },
    [15]: { id: 15, language: 2, text: "evil", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [6], attribution: "Wiktionary" },
    [16]: { id: 16, language: 2, text: "was (third-person singular indicative past indefinite of van)", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [7], attribution: "Wiktionary" },
    [17]: { id: 17, language: 2, text: "to be", note: "", provenance: Provenance.Derivative, ignored: false, created: hp, modified: hp, reviewed: hp, words: [], focus: null, translations: [], definitionOf: [9], attribution: "Wiktionary" },
}

const words: {[key: number]: Word} = {
    [1]: { id: 1, language: 1, text: "nézd", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: 8, forms: [], definitions: [7], examples: [3] },
    [2]: { id: 2, language: 1, text: "ott", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [], definitions: [10], examples: [3] },
    [3]: { id: 3, language: 1, text: "egy", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [], definitions: [11, 12, 13], examples: [3, 5] },
    [4]: { id: 4, language: 1, text: "nyúl", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [], definitions: [14], examples: [5, 3] },
    [5]: { id: 5, language: 1, text: "ez", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [], definitions: [], examples: [5] },
    [6]: { id: 6, language: 1, text: "gonosz", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [], definitions: [15], examples: [5] },
    [7]: { id: 7, language: 1, text: "volt", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: 9, forms: [], definitions: [16], examples: [5] },
    [8]: { id: 8, language: 1, text: "néz", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [1], definitions: [8, 9], examples: [] },
    [9]: { id: 9, language: 1, text: "van", note: "", provenance: Provenance.Manual, ignored: false, created: hp, modified: hp, reviewed: hp,  base: null, forms: [7], definitions: [17], examples: [] },
}

let wdeep = (w: Word): WordDeep => {
    let wd: WordDeep = {...w} as unknown as WordDeep;
    if (w.base !== null)
        wd.base = words[w.base];
    else
        wd.base = null;
    wd.forms = w.forms.map(id => words[id]);
    wd.definitions = w.definitions.map(id => sentences[id]);
    wd.examples = w.examples.map(id => sentences[id]);
    return wd;
}

let sdeep = (s: Sentence): SentenceDeep => {
    let sd: SentenceDeep = {...s} as unknown as SentenceDeep;
    if (s.focus !== null)
        sd.focus = words[s.focus];
    sd.words = s.words.map(id => words[id]);
    sd.translations = s.translations.map(id => sentences[id]);
    sd.definitionOf = s.definitionOf.map(id => words[id]);
    return sd;
}

let responses: {
    // Request
    path: string,
    method: string,
    // Response
    body?: string | Object,
    status?: number,
}[] = [
    {path: "/api/sentences", method: "GET", body: Object.values(sentences).map(s => sdeep(s))},
    {path: "/api/words", method: "GET", body: Object.values(words).map(w => wdeep(w))},
    {path: "/api/languages", method: "GET", body: Object.values(languages)},
]

for (let i in sentences) {
    responses.push({path: "/api/sentences/" + i, method: "GET", body: sdeep(sentences[i])});
}

for (let i in words) {
    responses.push({path: "/api/words/" + i, method: "GET", body: wdeep(words[i])});
}

for (let i in languages) {
    responses.push({path: "/api/languages/" + i, method: "GET", body: languages[i]});
}

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
    let path = new URL(req.url).pathname;
    let method = req.method;
    for (let r of responses) {
        if (r.path === path && r.method === method) {
            let body = r.body;
            return of(new HttpResponse({
                body: body,
                status: r.status ?? 200,
            })).pipe(delay(500 + Math.random() * 500 + (path === "/api/languages" ? 1000 : 0)));
        }
    }
    console.warn("Request not matched by mockBackendInterceptor", path, method, req);
    return next(req);
};
