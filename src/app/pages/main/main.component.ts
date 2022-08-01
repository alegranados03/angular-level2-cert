import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { forkJoin } from 'rxjs';
import { IStockCard } from 'src/app/interfaces/stock-quote.interface';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private stockService: StockService) {}

  get stockList() {
    return this.stockService.stockList;
  }
  ngOnInit(): void {
    this.stockService.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
  }

  onSearchEvent(symbol: string) {
    forkJoin([
      this.stockService.getQuote(symbol),
      this.stockService.symbolSearch(symbol),
    ]).pipe(
      catchError((err)=>{
        this.stockService.isLoading.next(false);
        throw err;
      })
    ).subscribe((response) => {
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
      this.stockService.isLoading.next(false);
    });
  }

  removeFromList(stock: IStockCard) {
    this.stockService.removeStock(stock);
  }
}
