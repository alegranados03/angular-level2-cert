import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStockCard } from 'src/app/interfaces/stock-quote.interface';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  @Input()
  stock!: IStockCard;

  @Output() deleteEvent = new EventEmitter<IStockCard>();

  deleteStock() {
    this.deleteEvent.emit(this.stock);
  }
}
