import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text',
  standalone: true
})
export class TextPipe implements PipeTransform {

  transform(value:string , limit:number ): string {
    return value.split(" ",limit).join(" ");
  }

}

