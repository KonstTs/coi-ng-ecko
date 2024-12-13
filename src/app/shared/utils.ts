export const extract = (key: any, { [key]: extracted, ...rest }: any) => rest;

export function mergeObjects(_a:object, _b:object, strings=true){
  const deepMerge = (a: object, b: object, fn: { (key: any, a: any, b: any): any; (key: any, a: any, b: any): any; (arg0: string, arg1: any, arg2: any): any; }) => [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((nu, key) => ({ ...nu, [key]: fn(key, (<any>a)[key], (<any>b)[key]) }), {});

  const mergerFn = (key: any, a: any[], b: ConcatArray<any>) => {
    if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
    if (typeof a === 'object' && typeof b === 'object') return deepMerge(a, b, mergerFn);
    if (typeof a === 'string' && typeof b === 'string') return strings ? [a, b].join(' ') : b;
    return b ?? a;
  };
  
  return deepMerge(_a, _b, mergerFn);
}

export function extractPropertyPath(path: string) {
  return path
    .split('.')
    .filter((p) => isNaN(p as any))
    .join('.');
}

export function hasValue(value: string | any[] | null): boolean {
  return !(value == null || value.length === 0);
}

export const hasDuplicates = (arr: any[]): boolean => {
  return arr.some((x: any) => arr.indexOf(x) !== arr.lastIndexOf(x));
};


