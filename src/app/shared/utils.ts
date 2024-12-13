export const getElement = (selector: string): Element | HTMLElement => document.querySelector(selector);

export const getStyle = (selector: string, property: string, pseudo: string = null) => getComputedStyle(getElement(selector), pseudo).getPropertyValue(property);

export const colorme = () => Math.floor(Math.random() * 16777215).toString(16);

export const extract = (key: any, { [key]: extracted, ...rest }: any) => rest;

export const extractPropertyPath = (path: string) =>
  path
    .split('.')
    .filter((p) => isNaN(p as any))
    .join('.');

export const hasValue = (value: string | any[] | null): boolean => !(value == null || value.length === 0);

export const hasDuplicates = (arr: any[]): boolean => arr.some((x: any) => arr.indexOf(x) !== arr.lastIndexOf(x));

export function mergeObjects(_a: object, _b: object, strings = true) {
  const deepMerge = (a: object, b: object, fn: { (key: any, a: any, b: any): any; (key: any, a: any, b: any): any; (arg0: string, arg1: any, arg2: any): any }) =>
    [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((nu, key) => ({ ...nu, [key]: fn(key, (<any>a)[key], (<any>b)[key]) }), {});

  const mergerFn = (key: any, a: any[], b: ConcatArray<any>) => {
    if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
    if (typeof a === 'object' && typeof b === 'object') return deepMerge(a, b, mergerFn);
    if (typeof a === 'string' && typeof b === 'string') return strings ? [a, b].join(' ') : b;
    return b ?? a;
  };

  return deepMerge(_a, _b, mergerFn);
}
//mdn brower sniffing
export function deviceIsMobile(){
  let hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) hasTouchScreen = navigator.maxTouchPoints > 0;
  else if ("msMaxTouchPoints" in navigator) hasTouchScreen = (<any>navigator).msMaxTouchPoints > 0;
  else {  
    const mQ = matchMedia?.("(pointer:coarse)");
    if (mQ?.media === "(pointer:coarse)") hasTouchScreen = !!mQ.matches;
    else if ("orientation" in window) hasTouchScreen = true; // deprecated, but good fallback
    else {
      const UA = (<any>navigator).userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
}



