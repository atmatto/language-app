import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrentRouteService {
    protected router = inject(Router);

    get(): Observable<ActivatedRouteSnapshot> {
        return this.router.events.pipe(
            map(() => this.router.routerState.snapshot.root)
        );
    }
}
