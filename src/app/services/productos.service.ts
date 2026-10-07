import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly catalogo: Producto[] = [
    {
      id: 1,
      nombre: 'Teclado mecánico',
      descripcion: 'Switch rojo, retroiluminado',
      categoria: 'Periféricos',
      precio: 350,
    },
    {
      id: 2,
      nombre: 'Mouse inalámbrico',
      descripcion: 'DPI ajustable 12000',
      categoria: 'Periféricos',
      precio: 180,
    },
    {
      id: 3,
      nombre: 'Monitor 24"',
      descripcion: 'Full HD 75Hz IPS',
      categoria: 'Pantallas',
      precio: 1450,
    },
    {
      id: 4,
      nombre: 'Audífonos USB',
      descripcion: 'Sonido envolvente 7.1',
      categoria: 'Audio',
      precio: 420,
    },
    {
      id: 5,
      nombre: 'Disco SSD 1TB',
      descripcion: 'Lectura 550 MB/s',
      categoria: 'Almacenamiento',
      precio: 620,
    },
    {
      id: 6,
      nombre: 'Webcam 1080p',
      descripcion: 'Micrófono estéreo integrado',
      categoria: 'Periféricos',
      precio: 290,
    },
  ];

  obtenerProductos(): Producto[] {
    return [...this.catalogo];
  }
}
