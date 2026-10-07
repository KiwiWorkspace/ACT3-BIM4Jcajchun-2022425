import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ItemCarrito, Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly itemsSubject = new BehaviorSubject<ItemCarrito[]>([]);

  readonly carrito$: Observable<ItemCarrito[]> = this.itemsSubject.asObservable();

  readonly cantidadTotal$: Observable<number> = this.carrito$.pipe(
    map((items) => items.reduce((total, item) => total + item.cantidad, 0)),
  );

  obtenerItems(): ItemCarrito[] {
    return this.itemsSubject.getValue();
  }

  agregar(producto: Producto, cantidad = 1): void {
    const items = this.obtenerItems();
    const existente = items.find((item) => item.producto.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
      this.itemsSubject.next([...items]);
      return;
    }

    this.itemsSubject.next([...items, { producto, cantidad }]);
  }

  cambiarCantidad(idProducto: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.eliminar(idProducto);
      return;
    }

    const items = this.obtenerItems().map((item) =>
      item.producto.id === idProducto ? { ...item, cantidad } : item,
    );
    this.itemsSubject.next(items);
  }

  eliminar(idProducto: number): void {
    this.itemsSubject.next(this.obtenerItems().filter((item) => item.producto.id !== idProducto));
  }

  vaciar(): void {
    this.itemsSubject.next([]);
  }
}
