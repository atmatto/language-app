import {Component, ElementRef, inject, input} from '@angular/core';
import {SentenceComponent} from '../sentence.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';
import {WordSimpleComponent} from '../../word/word-simple/word-simple.component';

@Component({
    selector: 'tbody[app-sentence-row], thead[app-sentence-row]',
    imports: [
        SkeletonPlaceholderComponent,
        LanguageSimpleComponent,
        WordSimpleComponent
    ],
    templateUrl: './sentence-row.component.html',
    styleUrl: './sentence-row.component.css'
})
export class SentenceRowComponent extends SentenceComponent {
    protected host: ElementRef<HTMLTableSectionElement> = inject(ElementRef);
    protected isHeader = false;
    extended = input<boolean>(false);

    ngOnInit() {
        this.isHeader = this.host.nativeElement.tagName.toLowerCase() == "thead";
    }
}
