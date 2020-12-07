import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlSafe'
})
export class UrlSafePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
