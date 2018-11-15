import { Namespace } from "./../lang/namespace";
import { typeCheck } from "./types";

export const NodeMathNS = Math as any as Namespace;

export const Op = ({
  add(a: number, b: number): (number) {
    numericArguments(a, b);
    return a + b;
  },
  sub(a: number, b: number): (number) {
    numericArguments(a, b);
    return a - b;
  },
  mul(a: number, b: number): (number) {
    numericArguments(a, b);
    return a * b;
  },
  div(a: number, b: number): (number) {
    numericArguments(a, b);
    return a / b;
  },
  mod(a: number, b: number): (number) {
    numericArguments(a, b);
    return a % b;
  },
  pow(a: number, b: number): (number) {
    numericArguments(a, b);
    return a ** b;
  }
});

export const Cmp = ({
  gt(a: number, b: number): (boolean) {
    numericArguments(a, b);
    return a > b;
  },
  lt(a: number, b: number): (boolean) {
    numericArguments(a, b);
    return a < b;
  },
  gte(a: number, b: number): (boolean) {
    return Cmp.gt(a, b) || a === b;
  },
  lte(a: number, b: number): (boolean) {
    return Cmp.lt(a, b) || a === b;
  }
});

export const abs = Math.abs;
export const acosh = Math.acosh;
export const acos = Math.acos;
export const asinh = Math.asinh;
export const asin = Math.asin;
export const atan2 = Math.atan2;
export const atanh = Math.atanh;
export const atan = Math.atan;
export const cosh = Math.cosh;
export const cos = Math.cos;
export const log10 = Math.log10;
export const log = Math.log;
export const sign = Math.sign;
export const sin = Math.sin;
export const tanh = Math.tanh;
export const tan = Math.tan;

export const random = Math.random;

function bindNumericArguments(fn: Function)
: (Function) {
  return function (...args: any[]) {
    numericArguments(...args);
    return fn(...args);
  };
}

function numericArguments(...x: any[])
: (never | void) {
  for (const arg of x) {
    typeCheck("number", arg, true);
  }
}
