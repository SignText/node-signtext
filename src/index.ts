import * as fs from "fs";
import * as yargs from "yargs";

import { Runtime } from "./context/runtime";

const argv = yargs
    .string("eval")
      .alias("e", "eval")
      .describe("eval", "A string to evaluate")
    .parse(process.argv);

const runtime = new Runtime();

export function evaluateFile(path: string)
: (Promise<string>) {
  const content = fs.readFileSync(path, { encoding: "utf-8" });
  return evaluate(content);
}

export function evaluate(code: string)
: (Promise<string>) {
  return runtime.eval(code);
}

if (argv.eval) {
  evaluate(argv.eval)
      .then(console.log)
      .catch(console.error);
} else {
  yargs.showHelp();
}
