import { NamespaceValue, Namespace } from "./namespace";

export class Context {

  public ns : Namespace;

  public constructor(ns?: Namespace) {
    this.ns = ns || { };
  }

  public import(ns: Context | Namespace) {
    if (ns instanceof Context) {
      return this.import(ns.ns);
    }
    for (const key of Object.keys(ns)) {
      this.set(key, ns[key]);
    }
  }

  public set(identifier: string, value: NamespaceValue) : void {
    this.ns[identifier] = value;
  }

  public get(identifier: string)
  : (NamespaceValue) {
    return this.ns[identifier];
  }

}
