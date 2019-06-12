import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }


  public getToken(): string {

    return this.cookieService.get('token').toString();

  }

  public setToken(token: string): void {
    this.deleteToken();

    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.cookieService.set("token", token, date);

  }

  deleteToken(): void {
    this.cookieService.delete("token");
  }
}
