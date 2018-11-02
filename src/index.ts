import * as fs from "fs";
import * as nearley from "nearley";

const grammar = nearley.Grammar.fromCompiled(require("./grammar/grammar"));
const parser = new nearley.Parser(grammar);

export function evaluateFile(path: string)
: (string) {
  const content = fs.readFileSync(path, { encoding: "utf-8" });
  return evaluate(content);
}

export function evaluate(code: string)
: (string) {
  parser.feed(code);
  const results = parser.finish();
  const result = results[0];
  return JSON.stringify(result, null, 4);
}

console.log(evaluate(`"Hello, world!"`));
