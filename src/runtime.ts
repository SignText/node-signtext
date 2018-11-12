import { Mutex } from "async-mutex";
import * as nearley from "nearley";

import { FunctionCall } from "./lang/token/function-call";
import { Namespace } from "./lang/namespace";
import { Primitive } from "./lang/primitive";

const grammar = nearley.Grammar.fromCompiled(require("./lang/grammar/grammar"));

export class Runtime {

  private readonly parser: nearley.Parser;
  private readonly mutex: Mutex;

  public constructor() {
    this.parser = new nearley.Parser(grammar);
    this.mutex = new Mutex();
  }

  /**
   * Evaluates the argument `string` or `FunctionCall` using this `Runtime`'s
   * context and the given `Namespace`, returning the result.
   *
   * @param     {FunctionCall | string} x
   *            The `FunctionCall` token or `string` code to evaluate.
   * @param     {Namespace} ns
   *            The `Namespace` to use.
   * @return    {Promise<Primitive>}
   *            A `Promise` which eventually resolves to the final evaluation.
   */
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
