import { Component } from '@angular/core';
import { StockService } from './services/stock.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'level2-cert';
  stockList = [];
  constructor(private stockService: StockService) {
    this.onSearchEvent('TSLA');
  }

  onSearchEvent(stock: string) {
    forkJoin([
      this.stockService.getQuote(stock),
      this.stockService.symbolSearch(stock),
    ]).subscribe((response) => {
      console.log(response);
    });
  }
}
