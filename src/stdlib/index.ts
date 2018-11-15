import chalk from "chalk";

import { TypeofPrimitive } from "./../lang/primitive";
import * as css from "./web/css";
import * as strings from "./strings";

export const Chalk = chalk;

export const C = ({
  bool: x => Boolean(x),
  num: x => Number.parseFloat(x),
  str: x => `${x}`,
});

export const String = Object.assign({
  endsWith: (str: string, sub: string) =>
    str.endsWith(sub),
  startsWith: (str: string, sub: string) =>
    str.startsWith(sub),

  toLowerCase: (str: string) =>
    str.toLowerCase(),
  toUpperCase: (str: string) =>
    str.toUpperCase(),

  concat: (str: string, ...items: any[]) =>
    str.concat(...items),
  repeat: (str: string, count: number) =>
    str.repeat(count),
  substring: (str: string, a: number, b?: number) =>
    str.substring(a, b),

  length: (str: string) =>
    str.length,

  substr: void 0
}, strings);
String.substr = String.substring;

export const Web = ({
  CSS: css
});

/**
 * Inline if-statement.
 *
 * @param   {any} condition
 *          The condition to test.
 * @param   {T} a
 *          The value to return if `condition` is truthy.
 * @param   {U} b
 *          The value to return if `condition` is falsy.
 * @return  {T | U}
 *          `a` if `condition` is truthy, `b` otherwise.
 */
export function iif<T, U>(condition: false, a: T, b: U): (U);   // Special case
export function iif<T, U>(condition: true, a: T, b: U): (T);    // Special case
export function iif<T, U>(condition: any, a: T, b: U): (T | U);
export function iif(condition: any, a: any, b: any): any {
  return (!! condition) ? a : b;
}

export function is(type: "boolean", x: any): x is boolean; // Special case
export function is(type: "number", x: any): x is number;   // Special case
export function is(type: "string", x: any): x is string;   // Special case
export function is(type: TypeofPrimitive, x: any): (boolean) {
  return typeof x === type;
}

export function eq(a: any, b: any)
: (boolean) {
  return a === b;
}

export function not(x: boolean)
: (boolean) {
  return ! x;
}
