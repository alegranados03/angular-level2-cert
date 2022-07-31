import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithSign',
})
export class NumberWithSignPipe implements PipeTransform {
  transform(value: number): string {
    if(!value) return '0';
    return value > 0 ? `+${value}` : value.toString();
  }
}
