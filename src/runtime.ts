import { Mutex } from "async-mutex";
import * as nearley from "nearley";

import { Namespace } from "./lang/namespace";
import { Context } from "./lang/context";

const grammar = nearley.Grammar.fromCompiled(require("./lang/grammar/grammar"));

export class Runtime {

  private readonly parser: nearley.Parser;
  private readonly mutex: Mutex;
  private readonly ctx: Context;

  public constructor() {
    this.parser = new nearley.Parser(grammar);
    this.ctx = new Context();
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
  public async eval(
    x: string,
    ns: Namespace = {})
  : (Promise<string>) {
    const release = await this.mutex.acquire();
    const state = this.parser.save();
    this.parser.feed(x);
    this.parser.finish();

    const result = this.parser.results[0];
    this.parser.restore(state);
    release();
    const res = await this.ctx.eval(result, ns);
    return String(res);
  }

}
