import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCarrito } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { MonedaPipe } from '../../pipes/moneda.pipe';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';
import { TotalCarritoPipe } from '../../pipes/total-carrito.pipe';

@Component({
  selector: 'app-resumen-carrito',
  imports: [CommonModule, MonedaPipe, SubtotalPipe, TotalCarritoPipe],
  templateUrl: './resumen-carrito.html',
  styleUrl: './resumen-carrito.css',
})
export class ResumenCarritoComponent {
  readonly carrito$: Observable<ItemCarrito[]>;
  readonly cantidadTotal$: Observable<number>;

  constructor(private readonly servicioCarrito: CarritoService) {
    this.carrito$ = servicioCarrito.carrito$;
    this.cantidadTotal$ = servicioCarrito.cantidadTotal$;
  }
}
