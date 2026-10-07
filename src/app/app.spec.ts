import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { CarritoService } from './services/carrito.service';
import { ProductosService } from './services/productos.service';

describe('Flujo del carrito de ventas', () => {
  let fixture: ComponentFixture<App>;
  let carrito: CarritoService;

  const texto = (): string => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    fixture = TestBed.createComponent(App);
    carrito = TestBed.inject(CarritoService);
    fixture.detectChanges();
  });

  it('muestra el carrito vacío al iniciar', () => {
    expect(texto()).toContain('Tu carrito está vacío');
    expect(texto()).toContain('Agrega productos para ver el resumen');
  });

  it('agrega productos y recalcula subtotales y total de forma reactiva', () => {
    const teclado = TestBed.inject(ProductosService).obtenerProductos()[0];

    carrito.agregar(teclado, 2);
    fixture.detectChanges();

    expect(texto()).toContain('Q 700.00');

    carrito.cambiarCantidad(teclado.id, 3);
    fixture.detectChanges();

    expect(texto()).toContain('Q 1,050.00');
  });

  it('actualiza el total al eliminar un producto', () => {
    const productos = TestBed.inject(ProductosService).obtenerProductos();

    carrito.agregar(productos[0], 1);
    carrito.agregar(productos[1], 1);
    fixture.detectChanges();

    expect(texto()).toContain('Q 530.00');

    carrito.eliminar(productos[0].id);
    fixture.detectChanges();

    expect(texto()).toContain('Q 180.00');
    expect(texto()).not.toContain('Q 530.00');
  });
});
