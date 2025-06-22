import {Component, ElementRef, inject, input} from '@angular/core';
import {LanguageComponent} from '../language.component';
import {LanguageSimpleComponent} from '../language-simple/language-simple.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
    selector: 'tbody[app-language-row], thead[app-language-row]',
    imports: [
        LanguageSimpleComponent,
        SkeletonPlaceholderComponent,
    ],
    templateUrl: './language-row.component.html',
    styleUrl: './language-row.component.css'
})
export class LanguageRowComponent extends LanguageComponent {
    protected host: ElementRef<HTMLTableSectionElement> = inject(ElementRef);
    protected isHeader = false;
    extended = input<boolean>(false);

    ngOnInit() {
        this.isHeader = this.host.nativeElement.tagName.toLowerCase() == "thead";
    }
}
