import {Component, input} from '@angular/core';
import {WordComponent} from '../word.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';
import {WordSimpleComponent} from '../word-simple/word-simple.component';

@Component({
    selector: 'app-word-simple-row',
    imports: [
        SkeletonPlaceholderComponent,
        LanguageSimpleComponent,
        WordSimpleComponent
    ],
    templateUrl: './word-simple-row.component.html',
    styleUrl: './word-simple-row.component.css'
})
export class WordSimpleRowComponent extends WordComponent {
}
