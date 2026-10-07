import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subtotal', standalone: true })
export class SubtotalPipe implements PipeTransform {
  transform(precio: number | null | undefined, cantidad: number | null | undefined): number {
    if (precio == null || cantidad == null) {
      return 0;
    }
    return precio * cantidad;
  }
}
