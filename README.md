# Carrito de Ventas con Observables y Pipes en Angular

Aplicación Angular (standalone components) que implementa un flujo de carrito de ventas:
los productos se agregan, actualizan y eliminan desde componentes distintos, compartiendo el
estado mediante un servicio con `BehaviorSubject`, y los subtotales/totales se calculan en
plantilla con pipes (dos de ellos personalizados).

## Ejecución

```bash
npm install
npm start      # http://localhost:4200
npm test       # pruebas unitarias e de integración (Vitest)
npm run build  # build de producción
```

## 1. Contexto del carrito

| Modelo     | Campos                                                     |
| ---------- | ---------------------------------------------------------- |
| `Producto` | `id`, `nombre`, `descripcion`, `categoria`, `precio`        |
| `ItemCarrito` | `producto`, `cantidad`                                  |

El catálogo se consulta en `ProductosService` (`src/app/services/productos.service.ts`).

## 2. Componentes del flujo

| Componente              | Rol                                                                |
| ----------------------- | ------------------------------------------------------------------ |
| `ProductoListaComponent`| Listado del catálogo; elige cantidad y agrega productos al carrito. |
| `CarritoDetalleComponent`| Tabla del carrito: cambia cantidades, elimina y muestra subtotales. |
| `ResumenCarritoComponent`| Resumen del pedido: lista de ítems, unidades y total general.      |
| `App`                   | Encabezado con el contador total de unidades (también vía Observable). |

Ningún componente comparte estado entre sí: todos hablan con el mismo servicio.

## 3. Servicio como fuente de verdad (`CarritoService`)

- `BehaviorSubject<ItemCarrito[]>` privado → expuesto como `carrito$` (`Observable` inmutable).
- `cantidadTotal$ = carrito$.pipe(map(...))`: unidades acumuladas.
- Operaciones: `agregar`, `cambiarCantidad` (0 = eliminar), `eliminar`, `vaciar`.
- Toda operación emite un **nuevo arreglo** (patrón inmutable), por lo que todos los
  componentes suscritos reciben la actualización y Angular redibuja la interfaz.

Comunicación:

```
ProductoListaComponent ──agregar──┐
CarritoDetalleComponent ─cambiar/eliminar─┐
                                         ▼
                              CarritoService (BehaviorSubject)
                                         │  carrito$ / cantidadTotal$
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
        CarritoDetalleComponent  ResumenCarritoComponent   App
              (async pipe)            (async pipe)      (async pipe)
```

Los componentes se suscriben en la plantilla con `| async` (sin `subscribe` manual en la
mayoría de los casos), lo que evita fugas de memoria.

## 4. Pipes

| Pipe                     | Tipo          | Entrada                    | Salida                          |
| ------------------------ | ------------- | -------------------------- | ------------------------------- |
| `subtotal`               | Personalizado | `precio`, `cantidad`       | `precio * cantidad`             |
| `totalCarrito`           | Personalizado | `ItemCarrito[]`            | Suma de subtotales del carrito  |
| `moneda`                 | Personalizado | `number`                   | Texto `Q 1,050.00`              |

Uso en plantilla (encadenados):

```html
{{ item.producto.precio | subtotal:item.cantidad | moneda }}   <!-- subtotal por producto -->
{{ items | totalCarrito | moneda }}                            <!-- total general -->
```

Los pipes mantienen la lógica de cálculo y formato **declarativa y reutilizable** en la
vista; se reevalúan automáticamente cuando el Observable emite nuevos datos.

## 5. Data binding y directivas

- `*ngFor` para listar catálogo, filas del carrito y resumen.
- `*ngIf` para estados vacíos/llenos y botón *Vaciar carrito*.
- `| async as items` para guardar la colección y reutilizarla en la plantilla.
- `[value]` + `(change)` para cantidades, `(click)` para agregar/eliminar.

## 6. Verificación

`npm test` (12 pruebas):

- Pipes: cálculo de subtotal, total con datos vacíos.
- Servicio: agregar, acumular cantidad, actualizar, eliminar, vaciar y emisión a
  suscriptores.
- Integración (`app.spec.ts`): estado inicial vacío, recálculo reactivo del total al
  agregar/actualizar y al eliminar productos, verificando el texto renderizado (`Q 700.00`
  → `Q 1,050.00`, etc.).

Prueba manual: `npm start`, agregar productos desde el catálogo, modificar cantidades en la
tabla y verificar que subtotales, total y contador del encabezado cambien en el momento;
eliminar o vaciar el carrito y comprobar que el resumen vuelva al estado vacío.

## Estructura

```
src/app/
├── models/producto.model.ts        # Producto e ItemCarrito
├── services/
│   ├── productos.service.ts        # catálogo
│   └── carrito.service.ts          # BehaviorSubject (fuente de verdad)
├── pipes/
│   ├── subtotal.pipe.ts            # precio × cantidad
│   ├── total-carrito.pipe.ts       # suma de subtotales
│   └── moneda.pipe.ts              # formato Q 0.00
├── components/
│   ├── producto-lista/             # catálogo + agregar
│   ├── carrito-detalle/            # ítems + cantidades + eliminar
│   └── resumen-carrito/            # unidades + total
└── app.ts / app.html               # layout y contador general
```
