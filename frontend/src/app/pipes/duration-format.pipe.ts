import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(duration: number, ...args: unknown[]): string {

    let hours: number = Math.floor(duration / 60);
    let minutes: number = duration % 60;

    if (hours > 0) {
      return `${hours} hours ${minutes} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  }

}
