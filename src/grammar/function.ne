@lexer lexer

FunctionCall -> %lbracket %identifier %rbracket ParameterList
    {% function (data) {
      return `call ${data[1].value} with ${data[3]}`;
    } %}

ParameterList -> %lparen Literal %rparen
    {% function (data) {
      return [data[1]];
    } %}
