import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCarrito } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { MonedaPipe } from '../../pipes/moneda.pipe';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';

@Component({
  selector: 'app-carrito-detalle',
  imports: [CommonModule, MonedaPipe, SubtotalPipe],
  templateUrl: './carrito-detalle.html',
  styleUrl: './carrito-detalle.css',
})
export class CarritoDetalleComponent {
  readonly carrito$: Observable<ItemCarrito[]>;

  constructor(private readonly servicioCarrito: CarritoService) {
    this.carrito$ = servicioCarrito.carrito$;
  }

  cambiarCantidad(idProducto: number, valor: string | number): void {
    this.servicioCarrito.cambiarCantidad(idProducto, Number(valor));
  }

  eliminar(idProducto: number): void {
    this.servicioCarrito.eliminar(idProducto);
  }

  vaciar(): void {
    this.servicioCarrito.vaciar();
  }
}
