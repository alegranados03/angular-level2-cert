import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ISentiment,
  IStockCard,
  IstockQuote,
  IStockSearchObject,
  IstockSearchResponse,
} from '../interfaces/stock-quote.interface';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  token = environment.token;
  private _stockList: IStockCard[] = [];
  isLoading = new BehaviorSubject<boolean>(false);
  constructor(private appHttpService: AppHttpService) {
    const stocks = localStorage.getItem('stocks');
    if (stocks) {
      this._stockList = JSON.parse(stocks);
    }
  }

  get stockList() {
    return this._stockList;
  }

  pushStock(stock: IStockCard): void {
    this._stockList.push(stock);
    localStorage.setItem('stocks', JSON.stringify(this._stockList));
  }

  removeStock(stock: IStockCard): void {
    const index = this._stockList.indexOf(stock);
    this._stockList.splice(index, 1);
    localStorage.setItem('stocks', JSON.stringify(this._stockList));
  }

  symbolSearch(params: string): Observable<IStockSearchObject> {
    this.isLoading.next(true);
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

  getQuote(params: string): Observable<IstockQuote> {
    this.isLoading.next(true);
    return this.appHttpService.getHttp<IstockQuote>('/quote', {
      symbol: params,
      token: this.token,
    });
  }

  getInsiderSentiment(params: {
    symbol: string;
    from: string;
    to: string;
  }): Observable<ISentiment[]> {
    this.isLoading.next(true);
    return this.appHttpService
      .getHttp<{ data: ISentiment[]; symbol: string }>(
        '/stock/insider-sentiment',
        {
          symbol: params.symbol,
          from: params.from,
          to: params.to,
          token: this.token,
        }
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}
