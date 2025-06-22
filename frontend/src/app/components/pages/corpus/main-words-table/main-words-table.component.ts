import {Component, inject} from '@angular/core';
import {WordsTableComponent} from '../../../data-views/words-table/words-table.component';
import {MainWordsTableService} from '../../../../services/main-words-table.service';
import {SentencesTableComponent} from '../../../data-views/sentences-table/sentences-table.component';

@Component({
    selector: 'app-main-words-table',
    imports: [
        WordsTableComponent,
        SentencesTableComponent
    ],
    templateUrl: './main-words-table.component.html',
    styleUrl: './main-words-table.component.css'
})
export class MainWordsTableComponent {
    protected service = inject(MainWordsTableService);
}
