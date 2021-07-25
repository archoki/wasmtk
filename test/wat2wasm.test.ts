import { compile } from '../src/mod.ts';

console.log('wat2wasm()');
Deno.test('Test 1', async () => {
  await compile('(module)');
});

Deno.test('Test 2', async () => {
  const _ = await compile('(module)');
  new WebAssembly.Instance(
    new WebAssembly.Module(_)
  );
});