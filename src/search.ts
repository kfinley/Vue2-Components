export function search(list: Array<string | Record<string, any>> | string | Record<string, any>, term: string): any {
  const listType = Array.isArray(list) ? 'array' : typeof list;
  const func = getFunc(listType);
  return func(list as never, term);
}

function getFunc(type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array") {
  const match = {
    'string': searchInField,
    'number': searchInField,
    'bigint': searchInField,
    'boolean': searchInField,
    'array': searchInArray,
    'object': searchInObject,
    'symbol': () => false,
    'undefined': () => false,
    'function': () => false,
  };

  if (typeof match[type] !== 'undefined') {
    return match[type];
  } else {
    throw new Error(`Unknown element type "${type}"`);
  }
}

function searchInField(value: string | number | boolean | bigint, term: string): string | number | boolean | bigint {
  const regEx = new RegExp(term, "gi");
  const found = regEx.test(value.toString());
  if (found) {
    return value
  }
  return false;
}

function searchInObject(o: object, term: string): boolean | string | Record<string, object> {
  const result = searchInArray(Object.values(o), term);
  if (result.length == 0) {
    return false;
  }
  return result[0];
  // return o;
}

function searchInArray(a: Array<string | Record<string, any>>, term: string): Array<string | Record<string, any>> {
  return a.filter(i => {
    return search(i, term);
  });
}
