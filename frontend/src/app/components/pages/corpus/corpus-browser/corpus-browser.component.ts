import {Component, input} from '@angular/core';
import {TabsComponent} from '../../../general/tabs/tabs.component';
import {RouterLink} from '@angular/router';
import {MainWordsTableComponent} from '../main-words-table/main-words-table.component';
import {MainSentencesTableComponent} from '../main-sentences-table/main-sentences-table.component';

@Component({
  selector: 'app-corpus-browser',
    imports: [
        TabsComponent,
        RouterLink,
        MainWordsTableComponent,
        MainSentencesTableComponent
    ],
  templateUrl: './corpus-browser.component.html',
  styleUrl: './corpus-browser.component.css'
})
export class CorpusBrowserComponent {
    protected browserMode = input<"sentences" | "words">("sentences");
}
