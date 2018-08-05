import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../main/models/user.model';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private readonly _url = '/API/users';
  private _user$: BehaviorSubject<User> ;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    this.parseToken();
  }

  public parseToken() {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      } else {
        if (!this.user$) {
          this._user$ = new BehaviorSubject<User>(
            User.fromJSON(parsedToken.user)
          );
        }
        this.user$.next(User.fromJSON(parsedToken.user));
      }
      console.log(this._user$.value);
    }
  }

  get user$(): BehaviorSubject<User> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          console.log(token);
          localStorage.setItem(this._tokenKey, token);
          this.parseToken();
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      setTimeout(() => this._user$.next(null));
    }
  }

  register(user: User): Observable<boolean> {
    console.log(user.toJSON());
    return this.http.post(`${this._url}/register`, user.toJSON()).pipe(
      map((usr: any) => {
        const token = usr.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(usr.username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
