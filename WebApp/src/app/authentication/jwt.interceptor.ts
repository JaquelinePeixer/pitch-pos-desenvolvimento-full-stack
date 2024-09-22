
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const loggeduser = this.authenticationService.loggedUser();
        const ignore = this.ignore(request.url);
        if (!ignore && loggeduser && loggeduser.token) {
            if (!request.headers.has('Authorization')) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${loggeduser.token}`
                    }
                })
            }
        }
        return next.handle(request)
    }

    private ignore(route: string) {
        return environment.apiWhiteList.some(value => route.endsWith(value))
    }
}