import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ISentiment } from 'src/app/interfaces/stock-quote.interface';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  sentiments!: ISentiment[];

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //symbol=TSLA&from=2022-01-01&to=2022-03-01
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const currDate = new Date();
          const to = this.dateFormat(currDate);
          currDate.setMonth(currDate.getMonth() - 2); //substracts 2 months to current date.
          const from = this.dateFormat(currDate);
          return this.stockService.getInsiderSentiment({
            symbol: params.symbol,
            from,
            to,
          });
        })
      )
      .subscribe((sentiments) => {
        this.sentiments = sentiments;
        console.log(sentiments);
      });
  }

  dateFormat(date: Date) {
    return `${date.getFullYear()}-${
      date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth()
    }-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}`;
  }
}
