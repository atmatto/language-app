import {Component, effect, inject, input, model} from '@angular/core';
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

    constructor() {
        console.log(this.selected());
        effect(() => {console.log("sel", this.selected())});
    }

    ngOnInit() {
        const def = this.service.getLanguages()[0];
    }

    protected select(event: Event) {
        const t = event.target;
        if (t !== null) {
            this.selected.set(parseInt((t as HTMLSelectElement).value));
        }
    }
}
