import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    let url = new URL(req.url, window.location.href);
    url.port = "8080";
    req = req.clone({url: url.toString()});
    return next(req);
};
