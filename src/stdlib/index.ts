import chalk from "chalk";

export const Chalk = chalk;

export function concat(...args: any[])
: (string) {
  return args.join("");
}
