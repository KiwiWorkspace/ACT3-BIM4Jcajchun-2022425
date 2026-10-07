import { TestBed } from '@angular/core/testing';
import { firstValueFrom, take } from 'rxjs';
import { Producto } from '../models/producto.model';
import { CarritoService } from './carrito.service';

describe('CarritoService', () => {
  const teclado: Producto = {
    id: 1,
    nombre: 'Teclado',
    descripcion: '',
    categoria: '',
    precio: 350,
  };
  const mouse: Producto = { id: 2, nombre: 'Mouse', descripcion: '', categoria: '', precio: 180 };

  let service: CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);
  });

  it('agrega un producto nuevo al carrito', () => {
    service.agregar(teclado, 2);

    expect(service.obtenerItems()).toEqual([{ producto: teclado, cantidad: 2 }]);
  });

  it('acumula la cantidad si el producto ya existe', () => {
    service.agregar(teclado, 1);
    service.agregar(teclado, 3);

    expect(service.obtenerItems()[0].cantidad).toBe(4);
  });

  it('actualiza y elimina productos', () => {
    service.agregar(teclado, 1);
    service.agregar(mouse, 1);

    service.cambiarCantidad(teclado.id, 5);
    expect(service.obtenerItems()[0].cantidad).toBe(5);

    service.cambiarCantidad(teclado.id, 0);
    expect(service.obtenerItems().length).toBe(1);
    expect(service.obtenerItems()[0].producto.id).toBe(mouse.id);
  });

  it('emite los cambios a los componentes suscritos y calcula la cantidad total', async () => {
    service.agregar(teclado, 2);
    service.agregar(mouse, 1);

    const cantidad = await firstValueFrom(service.cantidadTotal$.pipe(take(1)));

    expect(cantidad).toBe(3);
  });

  it('vacía el carrito', () => {
    service.agregar(teclado, 2);
    service.vaciar();

    expect(service.obtenerItems()).toEqual([]);
  });
});
