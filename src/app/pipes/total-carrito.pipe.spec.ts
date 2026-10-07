import { ItemCarrito } from '../models/producto.model';
import { TotalCarritoPipe } from './total-carrito.pipe';

describe('TotalCarritoPipe', () => {
  const pipe = new TotalCarritoPipe();

  const items: ItemCarrito[] = [
    {
      producto: { id: 1, nombre: 'Teclado', descripcion: '', categoria: '', precio: 350 },
      cantidad: 2,
    },
    {
      producto: { id: 2, nombre: 'Mouse', descripcion: '', categoria: '', precio: 180 },
      cantidad: 1,
    },
  ];

  it('suma los subtotales de todos los productos', () => {
    expect(pipe.transform(items)).toBe(880);
  });

  it('devuelve 0 con carrito vacío o nulo', () => {
    expect(pipe.transform([])).toBe(0);
    expect(pipe.transform(null)).toBe(0);
    expect(pipe.transform(undefined)).toBe(0);
  });
});
