@lexer lexer

FunctionCall -> VariableCall ParameterList
    {% function (data) {
      return ({
        type: "FunctionCall",
        ctx: {
          identifier: data[0].ctx.identifier,
          parameters: data[1]
        }
      });
    } %}

ParameterList -> %lparen Parameter (%comma Parameter):* %rparen
    {% function (data) {
      const ext_params = data[2].map(x => x[1]);
      return [data[1], ...ext_params];
    } %}

Parameter -> (Expression)
    {% function (data) {
      return data[0][0];
    } %}
