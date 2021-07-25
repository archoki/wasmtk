import { compile, loader } from "../src/mod.ts";

Deno.test("Compiling, then loading the compiled WAT with the loader function", async () => {
  const mod = await compile("(module)");
  loader(mod, { optimize: false });
});
