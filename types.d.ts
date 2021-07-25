export namespace WASMTK {
  interface CompilerOption {
    exceptions: boolean;
    mutableGlobals: boolean;
    satFloatToInt: boolean;
    signExtension: boolean;
    simd: boolean;
    threads: boolean;
    multiValue: boolean;
    tailCall: boolean;
    bulkMemory: boolean;
    referenceTypes: boolean;
    annotations: boolean;
    gc: boolean;
  }

  interface LoaderOptions {
    optimize: boolean;
    importObject?: ImportObject;
  }

  interface ImportObject {
    lib: Library[];
    tbl: WebAssembly.Table;
    mem: WebAssembly.Memory;
  }

  interface Library {
    name: string;
    func: CallableFunction;
  }
}
