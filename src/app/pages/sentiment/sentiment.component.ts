import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ISentiment } from 'src/app/interfaces/stock-quote.interface';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  sentiments: ISentiment[] = [];
  isLoading:boolean = false;
  companyName: string = '';
  symbol: string = '';
  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stockService.isLoading.subscribe((value)=>{
      this.isLoading = value;
    });
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const currDate = new Date();
          const to = this.dateFormat(currDate);
          currDate.setMonth(currDate.getMonth() - 2); //substracts 2 months to current date.
          const from = this.dateFormat(currDate);
          return forkJoin([
            this.stockService.getInsiderSentiment({
              symbol: params.symbol,
              from,
              to,
            }),
            this.stockService.symbolSearch(params.symbol),
          ]);
        })
      )
      .subscribe((responses) => {
        const [sentiments, company] = responses;
        this.companyName = company.description;
        this.symbol = company.symbol;
        this.sentiments = sentiments;
        this.stockService.isLoading.next(false);
      });
  }

  dateFormat(date: Date): string {
    return `${date.getFullYear()}-${
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)
    }-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}`;
  }
}
