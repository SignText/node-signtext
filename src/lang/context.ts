import { TokenType } from "./token/token-type";
import { NamespaceKey, Namespace } from "./namespace";
import { Primitive } from "./primitive";

export class Context {

  public async eval(x: Primitive | TokenType, ns: Namespace)
  : (Promise<NamespaceKey | string>) {
    if (typeof x === "object") {
      if (x.type === "FunctionCall") {
        const item = ns[x.ctx.identifier];
        const args = await Promise.all(x.ctx.parameters
            .map((arg) => this.eval(arg, ns)));
        if (typeof item === "function") {
          return item(...args);
        } else {
          throw new Error(`Expected function, found ${typeof item}`);
        }
      } else if (x.type === "VariableCall") {
        return ns[x.ctx.identifier];
      }
    } else {
      return x;
    }
  }

}
