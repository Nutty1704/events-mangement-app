import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endDateTimeCalc'
})
export class EndDateTimeCalcPipe implements PipeTransform {

  transform(startDate: Date, duration: number): string {
    startDate = new Date(startDate);
    let start: number = startDate.getTime();
    let end: number = start + duration * 60000;
    let output = new Date(end).toLocaleString();
    console.log(output);
    return output;
  }

}
