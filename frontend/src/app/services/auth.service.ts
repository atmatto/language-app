import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {UsersService} from './users.service';
import {SigninResponse} from '../model/input/signinResponse';
import {map, Observable, of, tap} from 'rxjs';

const TOKEN_KEY = "AuthToken";
const UID_KEY = "AuthUserId"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected http = inject(HttpClient);
    protected users = inject(UsersService);

    protected userId = signal<User["id"] | null>(null);

    constructor() {
        const uid = localStorage.getItem(UID_KEY);
        if (uid !== null) {
            this.userId.set(parseInt(uid));
        }
    }

    signIn(username: string, password: string): Observable<void> {
        return this.http.post<SigninResponse>("/api/v1/auth/session", {username, password}).pipe(
            map(r => {
                localStorage.setItem(TOKEN_KEY, r.jwt);
                localStorage.setItem(UID_KEY, String(r.user.id));
                this.users.cache.users.set(r.user.id, r.user);
                this.userId.set(r.user.id);
            })
        );
    }

    signOut(): void {
        localStorage.clear();
        window.location.reload();
    }

    register(username: string, password: string): Observable<void> {
        return this.http.post<User>("/api/v1/auth/account", {username, password}).pipe(
            map(u => {
                this.users.cache.users.set(u.id, u);
            })
        );
    }

    getCurrentUserId(): User["id"] | null {
        return this.userId();
    }

    getCurrentUser(): Observable<User | null> {
        const id = this.userId();
        if (id === null) {
            return of(null);
        } else {
            return this.users.get(id);
        }
    }
}
