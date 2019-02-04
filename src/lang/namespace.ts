import { Primitive } from "./primitive";

export type NamespaceValue = (Namespace | Function | Primitive | undefined);

export interface Namespace {
  [index: string]: NamespaceValue;
}
