import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CarritoDetalleComponent } from './components/carrito-detalle/carrito-detalle';
import { ProductoListaComponent } from './components/producto-lista/producto-lista';
import { ResumenCarritoComponent } from './components/resumen-carrito/resumen-carrito';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductoListaComponent, CarritoDetalleComponent, ResumenCarritoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly cantidadTotal$: Observable<number>;

  constructor(carritoService: CarritoService) {
    this.cantidadTotal$ = carritoService.cantidadTotal$;
  }
}
