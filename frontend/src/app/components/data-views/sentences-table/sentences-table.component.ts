import {Component, inject, input, output} from '@angular/core';
import {Sentence} from '../../../model/sentence';
import {SentenceRowComponent} from '../sentence/sentence-row/sentence-row.component';
import {TableComponent} from '../../general/table/table.component';
import {TableFooterComponent} from '../../general/table/table-footer/table-footer.component';
import {TableControlComponent} from '../../general/table/table-control/table-control.component';
import {EditorsService} from '../../../services/editors.service';

@Component({
    selector: 'app-sentences-table',
    imports: [
        SentenceRowComponent,
        TableComponent,
        TableFooterComponent,
        TableControlComponent,
    ],
    templateUrl: './sentences-table.component.html',
    styleUrl: './sentences-table.component.css'
})
export class SentencesTableComponent {
    protected editors = inject(EditorsService);

    sentenceIds = input<Sentence["id"][]>();
    sentenceClicked = output<Sentence["id"]>();
    addClicked = output<void>();
    searchEnabled = input<boolean>(false);
    searched = output<string>();
    sortEnabled = input<boolean>(false);
    sorted = output<string>();

    ngOnInit() {
        // TODO: what if you are editing a word, and open it in another dialog and there are two pages referring to the same word now?
        this.sentenceClicked.subscribe((ev) => this.editors.showSentence(ev));
    }

    protected search(event: Event) {
        const t = event.target;
        if (t !== null) {
            this.searched.emit((t as HTMLInputElement).value);
        }
    }
}
