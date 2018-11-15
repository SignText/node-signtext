import { String } from "./index";

export function lshift(str: string, amount = 1)
: (string) {
  const r = str.length - amount;
  return rshift(str, r);
}

export function replace(str: string, a: string, b: any = "")
: (string) {
  const pattern = new RegExp(a, "g");
  return str.replace(pattern, b);
}

export function reverse(str: string)
: (string) {
  const chars = split(str);
  return String.concat("", ...chars.reverse());
}

// TODO: This function can almost certainly be optimised... ?
export function rshift(str: string, amount = 1)
: (string) {
  if (amount < 0) throw new Error("`amount` must be >= 0");

  let chars = split(str);
  while (amount > 0) {
    chars = [" ", ...chars];
    chars[0] = chars[chars.length - 1];
    chars.length -= 1;
    amount -= 1;
  }
  return String.concat("", ...chars);
}

export function split(
  str: string,
  delim: string = "")
: (string[]) {
  const pattern = new RegExp(delim, "g");
  return str.split(pattern, -1);
}
