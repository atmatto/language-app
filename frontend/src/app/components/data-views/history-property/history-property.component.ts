import {Component, computed, input} from '@angular/core';
import {HistoryProperty} from '../../../model/history-property';
import {UserSimpleComponent} from '../user/user-simple/user-simple.component';

@Component({
    selector: 'app-history-property',
    imports: [
        UserSimpleComponent
    ],
    templateUrl: './history-property.component.html',
    styleUrl: './history-property.component.css'
})
export class HistoryPropertyComponent {
    value = input<HistoryProperty>();
    timestamp = computed(() => {
        const str = this.value()?.timestamp;
        if (str === undefined) {
            return "?";
        } else {
            const d = new Date(str);
            return d.toLocaleString('en-US', {dateStyle: "long", timeStyle: "short", hour12: false});
        }
    });
}
