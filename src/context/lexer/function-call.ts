import { Primitive } from "./../object/primitive";

export type FunctionCall = ({
  identifier: string;
  parameters: (FunctionCall | Primitive)[];
});
