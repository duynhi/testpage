import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpRequest } from '@angular/common/http/src/request';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    cachedRequests: Array<HttpRequest<any>> = [];
    public getToken(): string {
        return localStorage.getItem('jwtToken');
    }

    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting
        // whether or not the token is expired
        return this.tokenNotExpired(token);
    }
    public tokenNotExpired(token) {
        if (token) {
            // const jwtHelper = new JwtHelperService();
            return true;
        } else {
            return false;
        }
    }
    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }
}
