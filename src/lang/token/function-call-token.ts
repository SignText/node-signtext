import { Primitive } from "../primitive";

export type FunctionCallToken = ({
  type: "FunctionCall";
  ctx: {
    identifier: string;
    parameters: any[];
  };
});
