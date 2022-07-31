import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { forkJoin } from 'rxjs';
import { IStockCard } from 'src/app/interfaces/stock-quote.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private stockService: StockService) {}

  get stockList() {
    return this.stockService.stockList;
  }
  ngOnInit(): void {}

  onSearchEvent(symbol: string) {
    forkJoin([
      this.stockService.getQuote(symbol),
      this.stockService.symbolSearch(symbol),
    ]).subscribe((response) => {
      const [quote, searchResult] = response;
      this.stockService.pushStock({
        name: searchResult.description,
        symbol: searchResult.displaySymbol,
        currentPrice: quote.c,
        highPriceOfDay: quote.h,
        lowPriceOfDay: quote.l,
        openPriceOfDay: quote.o,
        previousClosePrice: quote.pc,
        percentChange: quote.dp,
      });
    });
  }

  removeFromList(stock: IStockCard) {
    this.stockService.removeStock(stock);
  }
}
