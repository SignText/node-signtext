import { Mutex } from "async-mutex";
import * as nearley from "nearley";

import { FunctionCall } from "./lexer/function-call";
import { Namespace } from "./object/namespace";
import { Primitive } from "./object/primitive";

const grammar = nearley.Grammar.fromCompiled(require("./../grammar/grammar"));

export class Runtime {

  private readonly parser: nearley.Parser;
  private readonly mutex: Mutex;

  public constructor() {
    this.parser = new nearley.Parser(grammar);
    this.mutex = new Mutex();
  }

  public async eval(x: FunctionCall | string, ns?: Namespace)
  : (Promise<Primitive>) {
    if (typeof ns === "undefined") return this.eval(x, {});
    if (typeof x !== "string") return this._eval(x, ns);

    const release = await this.mutex.acquire();
    this.parser.feed(x);
    this.parser.finish();

    const result = this.parser.results[0][0];
    release();
    return this._eval(result, ns);
  }

  private _eval(x: FunctionCall | Primitive, ns: Namespace)
  : (Primitive | string) {
    if (typeof x !== "object") return x;

    const params = x.parameters.map(y => this._eval(y, ns));
    const fn = ns[x.identifier];
    if (typeof fn !== "function") {
      throw new Error(`Cannot call type '${typeof fn}'`);
    }
    return fn(...params);
  }

}
