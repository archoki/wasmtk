# wasmtk

[`wasmtk`](https://github.com/archoki/wasmtk) (WebAssembly Toolkit) is a
collection of tools to help you get started with your WebAssembly journey!

> This project was made possible with
> [`binaryen`](https://github.com/WebAssembly/binaryen)

## Usage

You can embed the module in your project. Just `import` it.

```ts
import * as wasmtk from "https://deno.land/x/wasmtk/exports.ts";
```

You can also use the [`cli`](https://github.com/archoki/wasmtk/blob/main/cli.ts)
with [`dpx`](https://github.com/denorg/dpx)

```sh
$ dpx wasmtk [...Option] [File]
```

Alternatively, you can install the
[`cli`](https://github.com/archoki/wasmtk/blob/main/cli.ts) with the following.

```sh
$ deno install --allow-read --allow-write -n wasmtk https://deno.land/x/wasmtk/cli.ts

# Once it's install, run `wasmtk --help` to get started
$ wasmtk --help
```

## Exit code

| Exit code | Explanation            |
| --------- | ---------------------- |
| `0`       | Process was successful |
| `1`       | User error             |
| `2`       | Internal error         |

If you encountered any `2` exit code, please open an issue with your error

## License

This project is licensed under the **MIT License**.\
Read more [here](https://github.com/archoki/wasmtk/blob/main/LICENSE)
