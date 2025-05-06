import {Component, input} from '@angular/core';
import {Provenance} from '../../../model/provenance';

@Component({
    selector: 'app-provenance',
    imports: [],
    templateUrl: './provenance.component.html',
    styleUrl: './provenance.component.css'
})
export class ProvenanceComponent {
    value = input<Provenance>();

    protected getString() {
        switch (this.value()) {
            case Provenance.Manual:
                return "Manual";
            case Provenance.Auto:
                return "Automatic";
            case Provenance.Derivative:
                return "Derivative";
            case Provenance.Batch:
                return "Batch";
            case undefined:
                return "—";
            default:
                console.error("Value unhandled by ProvenanceComponent", this.value());
                return "—";
        }
    }
}
