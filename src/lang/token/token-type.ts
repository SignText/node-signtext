import { FunctionCallToken } from "./function-call-token";
import { VariableCallToken } from "./variable-call-token";

export type TokenType = (FunctionCallToken | VariableCallToken);
