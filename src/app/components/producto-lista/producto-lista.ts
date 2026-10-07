import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';
import { MonedaPipe } from '../../pipes/moneda.pipe';

@Component({
  selector: 'app-producto-lista',
  imports: [CommonModule, FormsModule, MonedaPipe],
  templateUrl: './producto-lista.html',
  styleUrl: './producto-lista.css',
})
export class ProductoListaComponent {
  readonly productos: Producto[];
  readonly cantidades = new Map<number, number>();

  constructor(
    productosService: ProductosService,
    private readonly carrito: CarritoService,
  ) {
    this.productos = productosService.obtenerProductos();
    this.productos.forEach((producto) => this.cantidades.set(producto.id, 1));
  }

  obtenerCantidad(producto: Producto): number {
    return this.cantidades.get(producto.id) ?? 1;
  }

  cambiarCantidad(producto: Producto, valor: string | number): void {
    const cantidad = Math.max(1, Number(valor) || 1);
    this.cantidades.set(producto.id, cantidad);
  }

  agregar(producto: Producto): void {
    this.carrito.agregar(producto, this.obtenerCantidad(producto));
    this.cantidades.set(producto.id, 1);
  }
}
