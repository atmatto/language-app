import {Component, ElementRef, forwardRef, inject, input} from '@angular/core';
import {SentenceComponent} from '../sentence.component';
import {Dialog} from '../../../../services/overlays.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {ProvenanceComponent} from '../../provenance/provenance.component';
import {HistoryPropertyComponent} from '../../history-property/history-property.component';
import {WordsTableComponent} from '../../words-table/words-table.component';
import {WordSimpleComponent} from '../../word/word-simple/word-simple.component';
import {SentencesTableComponent} from '../../sentences-table/sentences-table.component';

@Component({
    selector: 'app-sentence-page',
    imports: [
        LanguageSimpleComponent,
        SkeletonPlaceholderComponent,
        ProvenanceComponent,
        HistoryPropertyComponent,
        forwardRef(() => WordsTableComponent),
        WordSimpleComponent,
        SentencesTableComponent,
    ],
    templateUrl: './sentence-page.component.html',
    styleUrl: './sentence-page.component.css'
})
export class SentencePageComponent extends SentenceComponent {
    protected host: ElementRef<HTMLElement> = inject(ElementRef);

    dialog = input<Dialog>();

    ngOnInit() {
        let d = this.dialog();
        if (d !== undefined) {
            d.closeRequested.pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => d.remove.next());
            this.host.nativeElement.parentElement?.classList.add("fullwidth");
        }
    }
}
