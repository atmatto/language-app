import {Component, input} from '@angular/core';
import {SkeletonPlaceholderComponent} from "../../../general/skeleton-placeholder/skeleton-placeholder.component";
import {SentenceComponent} from '../sentence.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';

@Component({
  selector: 'app-sentence-simple',
    imports: [
        SkeletonPlaceholderComponent,
        LanguageSimpleComponent
    ],
  templateUrl: './sentence-simple.component.html',
  styleUrl: './sentence-simple.component.css'
})
export class SentenceSimpleComponent extends SentenceComponent {
    showFlag = input<boolean>(false);
}
