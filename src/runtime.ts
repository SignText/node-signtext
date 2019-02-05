import * as nearley from "nearley";

import { NamespaceValue } from "./lang/namespace";
import { Context } from "./lang/context";
import { Primitive } from "./lang/primitive";
import { TokenType } from "./lang/token/token-type";

const grammar = nearley.Grammar.fromCompiled(
    require("./lang/grammar/grammar"));

/**
 * Defines a parser and interpreter instance.
 */
export class Runtime {

  private readonly parser: nearley.Parser;

  public constructor() {
    this.parser = new nearley.Parser(grammar);
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
    const parsed = await this.parse(x);
    const res = await this._eval(parsed, ctx);
    return String(res);
  }

  public async parse(x: string)
  : (Promise<any>) {
    const state = this.parser.save();
    this.parser.feed(x);
    this.parser.finish();

    const result = this.parser.results[0];
    this.parser.restore(state);
    return result;
  }

  private async _eval(x: Primitive | TokenType, ctx: Context)
  : (Promise<NamespaceValue | string>) {
    if (typeof x === "object") {
      if (x.type === "Call") {
        const target = ctx.get(x.ctx.identifier);
        const args = await Promise.all(
            x.ctx.parameters.map((param) => this._eval(param, ctx))
          );

        if (typeof target === "function") {
          target.apply(null, args);
        } else {
          throw new Error("Expected function, received " + (typeof target));
        }
      } else if (x.type === "Get") {
        return ctx.get(x.ctx.identifier);
      }
    } else {
      return x;
    }
  }

}
