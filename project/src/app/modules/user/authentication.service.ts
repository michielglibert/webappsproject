import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private _url = 'http://localhost:3000/';
  //private readonly _url = 'https://surveyymaster.herokuapp.com/';
  private _user$: BehaviorSubject<string>;
  public redirectUrl;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(
      currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<TokenResponse>(this._url + 'login',
      { username: username, password: password }).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: token
          }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post<TokenResponse>(this._url + 'register',
      { username: username, password: password }).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: res.token
          }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post<CheckUsernameResponse>(this._url + 'checkusername', { username: username })
    .map(item => {
      if (item.username === 'alreadyexists') {
        return false;
      } else {
        return true;
      }
    });
  }

  logout() {
    console.log(this.user$.value)
    if(this.user$.value) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }
  
}

interface TokenResponse {
  token: string;
}

interface CheckUsernameResponse {
  username: string;
}


