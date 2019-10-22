import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService) { }

  public getUserId(): number {
    return Number(this.cookieService.get("userId"));
  }

  public setUserId(id: number) {
    this.cookieService.set("userId", String(id));
  }

  public deleteUserId() {
    this.cookieService.delete("userId");
  }


  public getToken(): string {
    return this.cookieService.get('token').toString();
  }

  public setToken(token: string): void {
    this.deleteToken();
    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.cookieService.set("token", token, date);

  }

  public deleteToken(): void {
    this.cookieService.delete("token");
  }


}
