import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieDataService} from '../../auth/cookieDatas/cookie-datas.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url = "http://91.134.142.39:8080/fridgeapi/";
  url = "http://localhost:8080/fridgeapi/";

  constructor(private cookieDatas: CookieDataService,
              private http: HttpClient) {
  }

  static numbersArrayToString(array: number[] | number): string {

    if(array == null)
      return '';

    if(typeof array === 'number')
      return (Number(array)).toString();
    else if(array.length === 0)
      return '';

    let result = '';

    for(let i = 0; i < array.length; i++) {
      result = result + array[i];
      result = result + ",";
    }

    return result;

  }

  public getHeaderWithToken() : HttpHeaders {
    let result = new HttpHeaders();
    result = result.append("token", this.cookieDatas.getToken());
    return result;
  }

  public get(url: string, headers: HttpHeaders, params: HttpParams) {
    return this.http.get(url, {headers, params}).toPromise();
  }

  public put(url: string, params: HttpParams, body: any, headers: HttpHeaders) {
    return this.http.put(url, body, {headers, params}).toPromise();
  }

  public post(url: string, body: any, headers: HttpHeaders) {
    headers = headers.append("Content-Type","application/json");
    return this.http.post(url, body, {headers: headers}).toPromise();
  }

  public delete(url: string, headers: HttpHeaders, params?: HttpParams) {
    return this.http.delete(url, {headers, params}).toPromise();
  }


}
