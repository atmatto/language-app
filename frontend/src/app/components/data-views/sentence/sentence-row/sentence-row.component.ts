import {Component, ElementRef, inject, input, output, signal} from '@angular/core';
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

    sortEnabled = input<boolean>(false);
    sorted = output<string>();
    protected sortField = signal<string>("");
    protected sortAsc = signal<boolean>(true);

    protected sortClicked(field: string) {
        if (!this.sortEnabled())
            return;

        if (this.sortField() === field) {
            if (this.sortAsc()) {
                this.sortAsc.set(false);
                this.sorted.emit("!" + field);
            } else {
                this.sortField.set("");
                this.sorted.emit("");
            }
        } else {
            this.sortField.set(field);
            this.sortAsc.set(true);
            this.sorted.emit(field);
        }
    }

    protected sortIcon(field: string) {
        if (this.sortField() === field) {
            return this.sortAsc() ? "↑" : "↓";
        } else {
            return "";
        }
    }

    ngOnInit() {
        this.isHeader = this.host.nativeElement.tagName.toLowerCase() == "thead";
    }
}
