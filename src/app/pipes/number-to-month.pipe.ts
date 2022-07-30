import { Pipe, PipeTransform } from '@angular/core';
import { months } from '../utils/months.util';

@Pipe({
  name: 'numberToMonth',
})
export class NumberToMonthPipe implements PipeTransform {
  transform(value: number): unknown {
    return value >= 1 && value <= 12
      ? months[value as keyof typeof months]
      : '';
  }
}
