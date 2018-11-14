
export function concat(...items: any[])
: (string) {
  return items.join("");
}

export function repeat(str: string, quantity: number)
: (string) {
  return String.prototype.repeat.apply(str, [quantity]);
}

export function replace(str: string, a: string, b: any)
: (string) {
  const pattern = new RegExp(a, "g");
  return String.prototype.replace.call(str, pattern, b);
}

export function reverse(str: string)
: (string) {
  const chars = split(str);
  return concat(...chars.reverse());
}

export function split(
  str: string,
  delim: string = "")
: (string[]) {
  const pattern = new RegExp(delim, "g");
  return str.split(pattern, -1);
}
