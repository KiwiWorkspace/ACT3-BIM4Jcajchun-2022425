import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'moneda', standalone: true })
export class MonedaPipe implements PipeTransform {
  transform(valor: number | null | undefined, simbolo = 'Q'): string {
    if (valor == null || isNaN(valor)) {
      return `${simbolo} 0.00`;
    }
    const partes = valor.toFixed(2).split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${simbolo} ${partes.join('.')}`;
  }
}
