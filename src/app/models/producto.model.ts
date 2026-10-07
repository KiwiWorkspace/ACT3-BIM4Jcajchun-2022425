export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
