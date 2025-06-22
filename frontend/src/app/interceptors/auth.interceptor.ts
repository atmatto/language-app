import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(AuthService).getToken();
    if (token !== null) {
        req = req.clone({
            headers: req.headers.append("Authentication", "Bearer " + token),
        });
    }
    return next(req);
    // TODO: Handle expired token and other auth failures.
};
