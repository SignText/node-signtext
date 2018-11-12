import { Primitive } from "./primitive";

export type NamespaceKey = (Namespace | Function | Primitive | undefined);

export interface Namespace {
  [index: string]: NamespaceKey;
}
