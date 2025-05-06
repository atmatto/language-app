import {Component, input} from '@angular/core';
import {LanguageComponent} from '../language.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
    selector: 'app-language-simple',
    imports: [
        SkeletonPlaceholderComponent
    ],
    templateUrl: './language-simple.component.html',
    styleUrl: './language-simple.component.css'
})
export class LanguageSimpleComponent extends LanguageComponent {
    showFlag = input<boolean>(true);
    showName = input<boolean>(true);
}
