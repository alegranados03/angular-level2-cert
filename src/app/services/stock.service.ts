import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  IstockQuote,
  IstockSearchResponse,
} from '../interfaces/stock-quote.interface';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  token = environment.token;
  constructor(private appHttpService: AppHttpService) {}
  symbolSearch(params: string) {
    return this.appHttpService
      .getHttp<IstockSearchResponse>('/search', {
        q: params,
        token: this.token,
      })
      .pipe(
        map((response) => {
          return response.result[0];
        })
      );
  }

  getQuote(params: string) {
    return this.appHttpService.getHttp<IstockQuote>('/quote', {
      symbol: params,
      token: this.token,
    });
  }
}
