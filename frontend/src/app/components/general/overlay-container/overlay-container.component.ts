import {Component, DestroyRef, inject, signal} from '@angular/core';
import {OverlaysService, Dialog} from '../../../services/overlays.service';
import {NgComponentOutlet} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-overlay-container',
    imports: [
        NgComponentOutlet,
        DialogComponent
    ],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.css'
})
export class OverlayContainerComponent {
    protected service = inject(OverlaysService);

    protected dialogs = signal<Dialog[]>([]);

    protected destroyRef = inject(DestroyRef);

    addDialog(d: Dialog): void {
        d.inputs["dialog"] = d;
        this.dialogs.update(ds => [...ds, d]);
        d.remove.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => this.removeDialog(d.id));
    }

    protected removeDialog(id: string): void {
        this.dialogs.update(ds => ds.filter(d => d.id != id));
    }

    constructor() {
        this.service.registerContainer(this);
    }
}
