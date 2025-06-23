import {Component, ElementRef, forwardRef, inject, input} from '@angular/core';
import {WordComponent} from '../word.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';
import {Dialog} from '../../../../services/overlays.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {WordsTableComponent} from '../../words-table/words-table.component';
import {WordSimpleComponent} from '../word-simple/word-simple.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';
import {ProvenanceComponent} from '../../provenance/provenance.component';
import {HistoryPropertyComponent} from '../../history-property/history-property.component';
import {SentenceSimpleComponent} from '../../sentence/sentence-simple/sentence-simple.component';
import {SentencesTableComponent} from '../../sentences-table/sentences-table.component';
import {EditorsService} from '../../../../services/editors.service';

@Component({
    selector: 'app-word-page',
    imports: [
        SkeletonPlaceholderComponent,
        WordsTableComponent,
        WordSimpleComponent,
        LanguageSimpleComponent,
        ProvenanceComponent,
        HistoryPropertyComponent,
        forwardRef(() => SentencesTableComponent),
    ],
    templateUrl: './word-page.component.html',
    styleUrl: './word-page.component.css'
})
export class WordPageComponent extends WordComponent {
    protected editors = inject(EditorsService);
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
