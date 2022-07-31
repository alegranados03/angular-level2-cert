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
  companyName: string = '';
  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        // this.sentiments = sentiments;
        const [sentiments, company] = responses;
        console.log(responses);
        this.companyName = company.description;
        this.sentiments = sentiments;
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
