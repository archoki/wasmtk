import { compile } from "../src/mod.ts";
Deno.test("Compiling WAT", async () => {
  await compile("(module)");
});

Deno.test("Compiling and loading WAT", async () => {
  const _ = await compile("(module)");
  new WebAssembly.Instance(
    new WebAssembly.Module(_),
  );
});
