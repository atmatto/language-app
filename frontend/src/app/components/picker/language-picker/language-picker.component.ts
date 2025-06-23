import {Component, inject, input, model} from '@angular/core';
import {LanguagesService} from '../../../services/languages.service';
import {Language} from '../../../model/language';

@Component({
    selector: 'app-language-picker',
    imports: [],
    templateUrl: './language-picker.component.html',
    styleUrl: './language-picker.component.css'
})
export class LanguagePickerComponent {
    protected service = inject(LanguagesService);

    selected = model<Language["id"]>();

    ngOnInit() {
        const def = this.service.getLanguages()[0];
        if (def !== undefined)
            this.selected.set(def.id);
    }

    protected select(event: Event) {
        const t = event.target;
        if (t !== null) {
            this.selected.set(parseInt((t as HTMLSelectElement).value));
        }
    }
}
