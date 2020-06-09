import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/api')) {
            let token = '';
            const profile = localStorage.getItem('profile');
            if (profile !== null) {
                token = JSON.parse(profile).token;
            }
            const clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
            return next.handle(clonedRequest);
        }
        return next.handle(req);
    }
}
