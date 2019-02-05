import { NamespaceValue, Namespace } from "./namespace";

export class Context {

  public ns : Namespace;

  public constructor(ns?: Namespace) {
    this.ns = ns || { };
  }

  /**
   * Imports all properties from the `Context`/`Namespace` provided.
   *
   * @param   {Context | Namespace} ns
   *          The `Context` or `Namespace` whose properties should be copied.
   * @returns {this}
   */
  public import(ns: Context | Namespace)
  : (this) {
    if (ns instanceof Context) {
      return this.import(ns.ns);
    }
    for (const key of Object.keys(ns)) {
      this.set(key, ns[key]);
    }
    return this;
  }

  /**
   * Set the value of property `identifier`.
   *
   * @param     {string}          identifier
   *            The identifier of the property.
   * @param     {NamespaceValue}  value
   *            The value to assign to the property.
   * @returns   {void}
   */
  public set(identifier: string, value: NamespaceValue)
  : (void) {
    this.ns[identifier] = value;
  }

  /**
   * @param     {string}            identifier
   *            The identifier of the property.
   * @returns   {(NamespaceValue)}
   *            The property's value.
   */
  public get(identifier: string)
  : (NamespaceValue) {
    return this.ns[identifier];
  }

}
