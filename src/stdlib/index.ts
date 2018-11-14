import * as strings from "./strings";

export const Strings = ({
  concat: strings.concat
});

export const String = ({
  repeat: strings.repeat,
  replace: strings.replace,
  reverse: strings.reverse,
  split: strings.split
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
export function iif<T, U>(condition: false, a: T, b: U): (U);
export function iif<T, U>(condition: true, a: T, b: U): (T);
export function iif<T, U>(condition: any, a: T, b: U): (T | U);
export function iif(condition: any, a: any, b: any): any {
  return (!! condition) ? a : b;
}
