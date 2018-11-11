@lexer lexer

FunctionCall -> %lbracket %identifier %rbracket ParameterList
    {% function (data) {
      return ({
        identifier: data[1].value,
        parameters: data[3]
      });
    } %}

ParameterList -> %lparen Parameter (%comma Parameter):* %rparen
    {% function (data) {
      return [data[1], ...data[2].map(x => x[1])];
    } %}

Parameter -> (FunctionCall | Literal)
    {% function (data) {
      return data[0][0];
    } %}
