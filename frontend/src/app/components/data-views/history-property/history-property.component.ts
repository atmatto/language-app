import {Component, input} from '@angular/core';
import {HistoryProperty} from '../../../model/history-property';

@Component({
    selector: 'app-history-property',
    imports: [],
    templateUrl: './history-property.component.html',
    styleUrl: './history-property.component.css'
})
export class HistoryPropertyComponent {
    value = input<HistoryProperty>();
}
