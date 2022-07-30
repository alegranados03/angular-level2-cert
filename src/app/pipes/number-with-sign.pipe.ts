import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithSign',
})
export class NumberWithSignPipe implements PipeTransform {
  transform(value: number): string {
    return value > 0 ? `+${value}` : value.toString();
  }
}
