import { TypeofPrimitive } from "./../lang/primitive";

export function typeCheck(type: TypeofPrimitive, x: any, throws: boolean): (boolean | never);
export function typeCheck(type: TypeofPrimitive, x: any, throws: true): (boolean | never);
export function typeCheck(type: TypeofPrimitive, x: any, throws: false): (boolean);
export function typeCheck(
  type: string,
  x: any,
  throws?: boolean)
: (boolean | never) {
  const is = typeof type === "string"
      ? typeof x === type
      : x instanceof type;
  if (is) {
    return true;
  } else {
    typeError(typeof type, typeof x, throws);
    return false;
  }
}

export function typeError<T>(expected: string, received: T, throws?: boolean): (TypeError | never);
export function typeError<T>(expected: string, received: T, throws?: false): (TypeError);
export function typeError<T>(expected: string, received: T, throws?: true): (never);
export function typeError<T>(
  expected: string,
  received: T,
  throws?: boolean)
: (TypeError) {
  const err = new TypeError(`Expected ${expected}, received ${typeof received}`);
  if (throws) throw err;
  return err;
}
