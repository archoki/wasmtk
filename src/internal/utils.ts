const COMMENTS = /;;.*/;
const MEMORY = /(?:\(memory.*?)((?:\d|_)+)/;

const LOCAL = {
  GET: /local\.get/g,
  SET: /local\.set/g
}

const GLOBAL = {
  GET: /global\.get/g,
  SET: /global\.set/g
}

export function stripComments(wat: string): string {
  return wat.split('\n').map((line: string) => {
    return line.replace(COMMENTS, '');
  }).join('\n');
}

export function maxMemoryCheck(wat: string): boolean {
  const match = wat.match(MEMORY);
  if (!match && match === null) return false;

  if (match.length > 1) {
    const memory = parseInt(match[1].replaceAll('_', ''));
    if (memory > 32767) return true;
  }

  return false;
}

export function validate(wat: string): string {
  return wat
    .replace(GLOBAL.GET, 'global_get')
    .replace(GLOBAL.SET, 'global_set')
    .replace(LOCAL.GET, 'local_get')
    .replace(LOCAL.SET, 'local_set');
}