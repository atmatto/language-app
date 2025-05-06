import {Component, input} from '@angular/core';
import {WordComponent} from '../word.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';

@Component({
    selector: 'app-word-simple',
    imports: [
        SkeletonPlaceholderComponent,
        LanguageSimpleComponent
    ],
    templateUrl: './word-simple.component.html',
    styleUrl: './word-simple.component.css'
})
export class WordSimpleComponent extends WordComponent {
    showFlag = input<boolean>(false);
}
