import { Mutex } from "async-mutex";
import * as nearley from "nearley";

import { NamespaceValue } from "./lang/namespace";
import { Context } from "./lang/context";
import { Primitive } from "./lang/primitive";
import { TokenType } from "./lang/token/token-type";

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
  public async eval(x: string, ctx: Context)
  : (Promise<string>) {
    const release = await this.mutex.acquire();
    const state = this.parser.save();
    this.parser.feed(x);
    this.parser.finish();

    const result = this.parser.results[0];
    this.parser.restore(state);
    release();
    const res = await this._eval(result, ctx);
    return String(res);
  }

  private async _eval(x: Primitive | TokenType, ctx: Context)
  : (Promise<NamespaceValue | string>) {
    if (typeof x === "object") {
      if (x.type === "Call") {
        return await this._call(ctx, x.ctx.identifier, ...x.ctx.parameters);
      } else if (x.type === "Get") {
        return ctx.get(x.ctx.identifier);
      }
    } else {
      return x;
    }
  }

  private async _call(ctx: Context, identifier: string, ...params: any[])
  : (Promise<Primitive>) {
    const params2 = await Promise.all(
      params.map(x => this.eval(x, ctx))
    );
    const ex = ctx.get(identifier);
    if (typeof ex === "function") {
      return ex(...params2);
    } else {
      throw new Error("Expected function, received " + (typeof ex));
    }
  }

}
