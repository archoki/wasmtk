import type { WASMTK } from "../../types.d.ts";

export async function load(): Promise<WASMTK.Library[]> {
  const libs: WASMTK.Library[] = [];

  for await (const files of Deno.readDir("./src/lib/")) {
    if (files.isFile) {
      const lib: { [key: string]: CallableFunction } = await import(
        `../lib/${files.name}`
      );
      for (const func in lib) {
        libs.push({
          name: `${files.name.split(".")[0]}.${lib[func].name}`,
          func: lib[func],
        });
      }
    }
  }

  return libs;
}
