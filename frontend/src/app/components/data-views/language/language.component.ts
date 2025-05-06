import {Component, computed, inject, input} from '@angular/core';
import {LanguagesService} from '../../../services/languages.service';
import {Language} from '../../../model/language';

@Component({
    selector: 'app-language',
    imports: [],
    templateUrl: './language.component.html',
    styleUrl: './language.component.css'
})
export class LanguageComponent {
    protected languagesService = inject(LanguagesService);

    languageId = input<Language["id"]>();
}
