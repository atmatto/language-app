import {Component, inject} from '@angular/core';
import {SentencesTableComponent} from '../../../data-views/sentences-table/sentences-table.component';
import {MainSentencesTableService} from '../../../../services/main-sentences-table.service';

@Component({
    selector: 'app-main-sentences-table',
    imports: [
        SentencesTableComponent
    ],
    templateUrl: './main-sentences-table.component.html',
    styleUrl: './main-sentences-table.component.css'
})
export class MainSentencesTableComponent {
    protected service = inject(MainSentencesTableService);
}
