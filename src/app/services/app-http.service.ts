import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AppHttpService {

  apiUrl = 'https://finnhub.io/api/v1';
  constructor(private httpClient: HttpClient) {}

  getHttp<T>(endpoint: string, params: {}): Observable<T> {
    endpoint = this.apiUrl + endpoint;
    return this.httpClient.get<T>(endpoint, { params });
}
}