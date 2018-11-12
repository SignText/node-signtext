@lexer lexer

FunctionCall -> %lbracket %identifier %rbracket ParameterList
    {% function (data) {
      return ({
        type: "FunctionCall",
        ctx: {
          identifier: data[1].value,
          parameters: data[3]
        }
      });
    } %}

ParameterList -> %lparen Parameter (%comma Parameter):* %rparen
    {% function (data) {
      const ext_params = data[2].map(x => x[1]);
      return [data[1], ...ext_params];
    } %}

Parameter -> (FunctionCall | Literal)
    {% function (data) {
      return data[0][0];
    } %}
