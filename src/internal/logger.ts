export function error(msg: string): void {
  return console.log(`[\x1b[31mError\x1b[0m]: ${msg}`);
}