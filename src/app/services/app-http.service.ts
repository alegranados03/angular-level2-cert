import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class AppHttpService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getHttp<T>(endpoint: string, params: {}): Observable<T> {
    endpoint = this.apiUrl + endpoint;
    return this.httpClient.get<T>(endpoint, { params });
}
}