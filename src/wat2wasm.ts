import type { WASMTK } from "../types.d.ts";
import binaryen from "https://esm.sh/binaryen";
import wabtFn from "https://esm.sh/wabt";
import { maxMemoryCheck, stripComments } from "./internal/utils.ts";

/**
 * @param
 * The WAT (WebAssembly Text) source string
 *
 * @param
 * The compiler options
 */
export async function compile(
  wat: string,
  options?: WASMTK.CompilerOption,
): Promise<Uint8Array> {
  if (maxMemoryCheck(wat)) return Deno.exit(1);
  const wabt = await wabtFn();
  const defaultOptions: WASMTK.CompilerOption = {
    exceptions: false,
    mutableGlobals: false,
    satFloatToInt: false,
    signExtension: false,
    simd: false,
    threads: false,
    multiValue: false,
    tailCall: false,
    bulkMemory: false,
    referenceTypes: false,
    annotations: false,
    gc: false,
  };

  if (options && Object.keys(options).length !== 0) {
    for (const option in options) {
      defaultOptions[option as keyof WASMTK.CompilerOption] =
        options[option as keyof WASMTK.CompilerOption];
    }
  }

  wat = stripComments(wat);

  const wasm = wabt.parseWat("wat.wat", wat, defaultOptions);
  wasm.validate();

  const buffer = wasm.toBinary({
    log: false,
    canonicalize_lebs: false,
    relocatable: false,
    write_debug_names: false,
  }).buffer;

  const module = binaryen.readBinary(buffer);
  binaryen.setOptimizeLevel(3);
  module.optimize();

  return module.emitBinary();
}
