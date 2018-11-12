import { Primitive } from "./../primitive";

export type FunctionParameter = (FunctionCall | Primitive);

export type FunctionCall = ({
  identifier: string;
  parameters: FunctionParameter[];
});
