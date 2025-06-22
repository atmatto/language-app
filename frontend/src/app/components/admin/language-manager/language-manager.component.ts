import {Component, inject} from '@angular/core';
import {SentencesTableComponent} from "../../data-views/sentences-table/sentences-table.component";
import {LanguageManagerService} from '../../../services/language-manager.service';
import {LanguagesTableComponent} from '../../data-views/languages-table/languages-table.component';

@Component({
  selector: 'app-language-manager',
    imports: [
        SentencesTableComponent,
        LanguagesTableComponent
    ],
  templateUrl: './language-manager.component.html',
  styleUrl: './language-manager.component.css'
})
export class LanguageManagerComponent {
    protected service = inject(LanguageManagerService);
}
