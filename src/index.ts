import * as fs from "fs";
import * as yargs from "yargs";
import chalk from "chalk";

import { Runtime } from "./context/runtime";
import { Primitive } from "./context/object/primitive";

const argv = yargs
    .string("eval")
      .alias("e", "eval")
      .describe("eval", "A string to evaluate")
    .string("file")
      .alias("f", "file")
      .describe("file", "Path to a source file to evaluate")
    .parse(process.argv);
argv._.splice(0, 2);

const runtime = new Runtime();

export function evaluateFile(path: string)
: (Promise<Primitive>) {
  const content = fs.readFileSync(path, { encoding: "utf-8" });
  return evaluate(content);
}

export function evaluate(code: string)
: (Promise<Primitive>) {
  return runtime.eval(code, {
    concat(...x) {
      return x.join("");
    }
  });
}

if (argv.eval || argv._.length === 1) {
  const code = argv.eval || argv._[0];
  evaluate(code)
      .then(console.log)
      .catch(console.error);
} else if (argv.file) {
  evaluateFile(argv.file)
      .then(console.log)
      .catch(console.error);
} else {
  yargs.showHelp();
}
