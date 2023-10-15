import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {

  transform(date: Date, ...args: unknown[]): string {
    date = new Date(date);
    return date.toLocaleString();
  }

}
