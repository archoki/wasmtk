import type { WASMTK } from "../types.d.ts";
import { load } from "./internal/lib_loader.ts";
import binaryen from "https://esm.sh/binaryen";

/**
 * @param
 * The WebAssembly binary (in a `Uin8Array` instance)
 *
 * @param
 * The loader options
 */
export function loader(
  wasm: Uint8Array,
  {
    optimize = false,
    importObject = {
      mem: new WebAssembly.Memory({ initial: 1, maximum: 100 }),
      tbl: new WebAssembly.Table({ initial: 1, element: "anyfunc" }),
      lib: [],
    },
  }: WASMTK.LoaderOptions,
): void {
  load().then((libs) => {
    importObject.lib = libs;

    const mod = binaryen.readBinary(wasm);
    if (optimize && optimize === true) mod.optimize();

    const module = new WebAssembly.Module(mod.emitBinary());
    const { exports } = new WebAssembly.Instance(
      module,
      importObject as unknown as WebAssembly.Imports,
    );

    if (exports.main && typeof exports.main === "function") exports.main();
  });
}
