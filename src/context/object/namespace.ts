import { Primitive } from "./primitive";

export interface Namespace {
  [index: string]: Namespace | Function | Primitive;
}
