import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: any, number): any {
    return value.substring(0, Number(number)) + "...";
  }

}
