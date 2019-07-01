import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiService} from '../api/api.service';
import {AccountForm} from '../../../_models/request/AccountForm';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private url: string = this.api.url + "accounts";

  constructor(private http: HttpClient,
              private api: ApiService) {
  }


  public newAccount(form: AccountForm) {
    let url = this.url;
    let header = this.api.getHeaderWithToken();
    let body = form;

    return this.api.post(url, body, header);
  }


  public changeAccountDetails(password: string, form: AccountForm) {
    let url = this.url;
    let header = this.api.getHeaderWithToken();
        header.append("password", password);
    let body = form;

    return this.api.put(url, null, body, header);
  }


  public searchByName(name: string) {
    let url = this.url;
    let headers = this.api.getHeaderWithToken();
    let params = new HttpParams()
                .append("name", name);

    return this.api.get(url, headers, params);
  }




}
