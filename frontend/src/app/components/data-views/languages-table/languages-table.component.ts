import {Component, input, output} from '@angular/core';
import {Language} from '../../../model/language';
import {TableComponent} from '../../general/table/table.component';
import {TableControlComponent} from '../../general/table/table-control/table-control.component';
import {TableFooterComponent} from '../../general/table/table-footer/table-footer.component';
import {LanguageRowComponent} from '../language/language-row/language-row.component';

@Component({
  selector: 'app-languages-table',
    imports: [
        TableComponent,
        TableControlComponent,
        TableFooterComponent,
        LanguageRowComponent
    ],
  templateUrl: './languages-table.component.html',
  styleUrl: './languages-table.component.css'
})
export class LanguagesTableComponent {
    languageIds = input<Language["id"][]>();
    languageClicked = output<Language["id"]>();
}
