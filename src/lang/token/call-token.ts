
export type CallToken = ({
  type: "Call";
  ctx: {
    identifier: string;
    parameters: any[];
  };
});
