import {Component, inject, input, output} from '@angular/core';
import {TableComponent} from '../../general/table/table.component';
import {TableControlComponent} from '../../general/table/table-control/table-control.component';
import {TableFooterComponent} from '../../general/table/table-footer/table-footer.component';
import {WordRowComponent} from '../word/word-row/word-row.component';
import {Word} from '../../../model/word';
import {EditorsService} from '../../../services/editors.service';

@Component({
    selector: 'app-words-table',
    imports: [
        TableComponent, TableControlComponent, TableFooterComponent, WordRowComponent
    ],
    templateUrl: './words-table.component.html',
    styleUrl: './words-table.component.css'
    // styleUrl: '../sentences-table/sentences-table.component.css' // TODO: Temporary!
})
export class WordsTableComponent {
    protected editors = inject(EditorsService);

    wordIds = input<Word["id"][]>();
    wordClicked = output<Word["id"]>();
    addClicked = output<void>();
    searchEnabled = input<boolean>(false);
    searched = output<string>();
    sortEnabled = input<boolean>(false);
    sorted = output<string>();

    ngOnInit() {
        // TODO: what if you are editing a word, and open it in another dialog and there are two pages referring to the same word now?
        this.wordClicked.subscribe((ev) => this.editors.showWord(ev));
        this.addClicked.subscribe(() => this.editors.createWord());
    }

    protected search(event: Event) {
        const t = event.target;
        if (t !== null) {
            this.searched.emit((t as HTMLInputElement).value);
        }
    }
}
