import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationApiService {

  private url: string = this.api.url + "auth/";

  constructor(private api: ApiService) { }

  public loginWithForm(username: string, password: string) {
    let url = this.url + "login";
    let header = new HttpHeaders();
    header = header.append("username", username);
    header = header.append("password", password);
    let body = null;

    return this.api.post(url, body, header);
  }

  public loginWithToken() {
    let url = this.url + "login";
    let body = null;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }

  public logout() {
    let url = this.url + "logout";
    let body = null;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


}
