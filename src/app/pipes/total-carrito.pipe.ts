import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/producto.model';

@Pipe({ name: 'totalCarrito', standalone: true })
export class TotalCarritoPipe implements PipeTransform {
  transform(items: ItemCarrito[] | null | undefined): number {
    if (!items || items.length === 0) {
      return 0;
    }
    return items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }
}
