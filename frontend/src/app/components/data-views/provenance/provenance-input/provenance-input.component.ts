import {Component, effect, inject, model} from '@angular/core';
import {LanguagesService} from '../../../../services/languages.service';
import {Language} from '../../../../model/language';
import {Provenance} from '../../../../model/provenance';

@Component({
  selector: 'app-provenance-input',
  imports: [],
  templateUrl: './provenance-input.component.html',
  styleUrl: './provenance-input.component.css'
})
export class ProvenanceInputComponent {
    protected service = inject(LanguagesService);

    selected = model<Provenance>();

    ngOnInit() {
    }

    protected select(event: Event) {
        const t = event.target;
        if (t !== null) {
            this.selected.set((t as HTMLSelectElement).value as Provenance);
        }
    }

    protected readonly Provenance = Provenance;
}
