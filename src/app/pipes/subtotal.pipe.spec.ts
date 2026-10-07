import { SubtotalPipe } from './subtotal.pipe';

describe('SubtotalPipe', () => {
  const pipe = new SubtotalPipe();

  it('multiplica precio por cantidad', () => {
    expect(pipe.transform(350, 2)).toBe(700);
  });

  it('devuelve 0 cuando faltan datos', () => {
    expect(pipe.transform(null, 3)).toBe(0);
    expect(pipe.transform(100, undefined)).toBe(0);
  });
});
