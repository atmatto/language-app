import { Component } from '@angular/core';
import {UserComponent} from '../user.component';
import {HistoryPropertyComponent} from '../../history-property/history-property.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';
import {ProvenanceComponent} from '../../provenance/provenance.component';
import {SentencesTableComponent} from '../../sentences-table/sentences-table.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {WordSimpleComponent} from '../../word/word-simple/word-simple.component';
import {WordsTableComponent} from '../../words-table/words-table.component';

@Component({
  selector: 'app-user-page',
    imports: [
        HistoryPropertyComponent,
        LanguageSimpleComponent,
        ProvenanceComponent,
        SentencesTableComponent,
        SkeletonPlaceholderComponent,
        WordSimpleComponent,
        WordsTableComponent
    ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent extends UserComponent {

}
