import {Component, inject} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink, UrlSegment} from '@angular/router';
import {filter} from 'rxjs';
import {routes} from '../../app.routes';
import {CurrentRouteService} from '../../services/current-route.service';

@Component({
    selector: 'app-nav',
    imports: [
        RouterLink
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent {
    protected route = inject(CurrentRouteService);
    protected module = "";

    ngOnInit() {
        this.route.get().subscribe(
            r => {
                this.module = r.firstChild?.url[0]?.toString() ?? "";
            }
        )
    }
}
