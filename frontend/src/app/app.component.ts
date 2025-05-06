import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {OverlayContainerComponent} from './components/general/overlay-container/overlay-container.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavComponent, OverlayContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    // protected readonly RouterOutlet = RouterOutlet;
}
