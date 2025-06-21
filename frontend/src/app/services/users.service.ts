import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataCacheService} from './data-cache.service';
import {map, Observable, of} from 'rxjs';
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    protected http = inject(HttpClient);
    cache = inject(DataCacheService);

    get(id: User["id"], refreshCache: boolean = false): Observable<User> {
        let u = this.cache.users.get(id);
        if (u === undefined || refreshCache) {
            return this.http.get<User>(`/api/v1/user/${id}`).pipe(
                map(u => {
                    this.cache.users.set(u.id, u);
                    return u;
                })
            );
        } else {
            return of(u);
        }
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`/api/v1/user`).pipe(
            map(us => {
                return us.map(u => {
                    this.cache.users.set(u.id, u);
                    return u;
                });
            })
        );
    }
}
