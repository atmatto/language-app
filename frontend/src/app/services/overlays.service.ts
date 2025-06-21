import {Injectable, Type} from '@angular/core';
import {OverlayContainerComponent} from '../components/general/overlay-container/overlay-container.component';
import {Subject} from 'rxjs';
import {v4 as uuid} from 'uuid';

export type Dialog = {
    id: string;
    component: Type<any>;
    inputs: Record<string, unknown>;
    closeRequested: Subject<void>;
    remove: Subject<void>;
};

@Injectable({
    providedIn: 'root'
})
export class OverlaysService {
    protected container?: OverlayContainerComponent;

    registerContainer(c: OverlayContainerComponent): void {
        if (this.container !== undefined)
            console.error("Duplicate OverlayContainerComponent registered!");
        this.container = c;
    }

    openDialog(component: Type<any>, inputs: Record<string, unknown> = {}): Dialog | null {
        if (this.container === undefined) {
            return null;
        } else {
            let d: Dialog = {
                id: uuid(),
                component,
                inputs,
                closeRequested: new Subject<void>(),
                remove: new Subject<void>(),
            };
            this.container.addDialog(d);
            return d;
        }
    }

    openSimpleAlert(title: String, detail: String) {
        window.alert(`${title}\n\n${detail}`); // TODO
    }
}
