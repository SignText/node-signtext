import { TokenType } from "./token/token-type";
import { NamespaceKey, Namespace } from "./namespace";
import { Primitive } from "./primitive";

export class Context {

  public async eval(x: Primitive | TokenType, ns: Namespace)
  : (Promise<NamespaceKey | string>) {
    if (typeof x === "object") {
      if (x.type === "Call") {
        return await this.call(ns, x.ctx.identifier, ...x.ctx.parameters);
      } else if (x.type === "Get") {
        return this.get(ns, x.ctx.identifier);
      }
    } else {
      return x;
    }
  }

  public async call(ns: Namespace, item: string, ...params: any[])
  : (Promise<Primitive>) {
    const ex = this.get(ns, item);
    if (typeof ex === "function") {
      return ex(...params);
    } else {
      throw new Error("Expected function, received " + (typeof ex));
    }
  }

  public get(ns: Namespace, item: string)
  : (NamespaceKey) {
    const parts = item.split(/\./g);

    if (parts.length === 1) {
      return ns[parts[0]];
    } else {
      let res: any = ns;

      while (parts.length > 0) {
        const part = parts.splice(0, 1)[0];
        res = this.get(res, part);
      }
      return res;
    }
  }

}
