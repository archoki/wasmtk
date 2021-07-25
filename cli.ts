#!/usr/bin/env -S deno run --unstable --quiet --allow-all
// deno-language: ts

import { parse } from 'https://deno.land/std@0.102.0/flags/mod.ts';
import { compile, loader } from './exports.ts';
import chalkin from 'https://deno.land/x/chalkin@v0.1.3/mod.ts';
import { exists } from 'https://deno.land/std@0.102.0/fs/mod.ts';
import { VERSION, NAME } from './meta.js';
import { error } from './src/internal/logger.ts';

const args = parse(Deno.args);

async function main() {
  if (args.help || args.h) {
    console.log(chalkin.bold.underline(`${NAME}@${VERSION}`) + '\n' + '  A collection of tools to help you get started with your WebAssembly journey\n');
    console.log(chalkin.bold('Example:'));
    console.log(`  ${NAME} --compile module.wat module.wasm`);
    console.log(`  ${NAME} --run --optimize module.wasm\n`);
    console.log(chalkin.bold('Syntax:'))
    console.log(`  ${NAME} [...Options] [...Files]\n`);
    console.log(chalkin.bold('Options:'));
    console.log('  -h, --help              Show this message');
    console.log('  -v, --version           Show the version');
    console.log('  -e, --execute           Execute a `.wasm` file');
    console.log('  -o, --optimize          Optimize your WASM during compilation (can only be used with the `execute` flag)');
    console.log('  --outFile               The output file to write the `.wasm` at (must be used with `compile` flag) ');
    console.log('  --compile               Compile a `.wat` file to `.wasm` file');
    console.log('  --run                   Alias to `execute`\n');
    console.log(chalkin.bold('Files:'))
    console.log('  *.wat                   WebAssembly Text');
    console.log('  *.wasm                  WebAssembly Binary');
  }

  else if (args.version || args.v) {
    console.log(`${NAME} version: ${VERSION}`);
  }

  else if (args.e || args.execute || args.run) {
    const file: string = args.e || args.execute || args.run || '';
    let op = false;

    if (!file.endsWith('.wasm')) {
      error('Unsupported file type');
      Deno.exit(1);
    }

    if (await exists(file)) {
      if (args.o || args.optimize) op = true;
      loader(await Deno.readFile(file), { optimize: op });
    }
    
    error(`Could not locate file \`${file}\``);
    Deno.exit(1);
  }

  else if (args.compile) {
    if (!args.outFile) {
      error('Could not locate target file');
      Deno.exit(1);
    }

    const file: string = args.compile || '';

    if (!file.endsWith('.wat')) {
      error('Unsupported file type');
      Deno.exit(1);
    }

    if (await exists(file)) {
      const res = await compile(await Deno.readTextFile(file));
      await Deno.writeFile(args.outFile, res);
    }

    error(`Could not locate file \`${file}\``);
    Deno.exit(1);
  }
}

if (import.meta.main) await main();