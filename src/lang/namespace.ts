import { Primitive } from "./primitive";

export type NamespaceKey = (Namespace | Function | Primitive);

export interface Namespace {
  [index: string]: NamespaceKey;
}
