import * as fs from "fs";
import * as yargs from "yargs";

import { Runtime } from "./../runtime";
import * as stdlib from "./../stdlib";

function evaluate(code: string)
: (Promise<void>) {
  const runtime = new Runtime();
  return runtime.eval(code, stdlib)
      .then(console.log)
      .catch(console.error);
}

const argv = yargs
    .string("eval")
      .alias("e", "eval")
      .describe("eval", "A string to evaluate")
    .string("file")
      .alias("f", "file")
      .describe("file", "Path to a source file to evaluate")
    .parse(process.argv);
argv._.splice(0, 2);

if (argv.eval || argv._.length === 1) {
  const code = argv.eval || argv._[0];
  evaluate(code);
} else if (argv.file) {
  const code = fs.readFileSync(argv.file, { encoding: "utf-8" });
  evaluate(code);
} else {
  yargs.showHelp();
}

