
export function concat(...args: any[])
: (string) {
  return args.map(String).join("");
}
