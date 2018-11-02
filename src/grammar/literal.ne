@lexer lexer

BooleanLiteral -> (%true | %false)
    {% function (data) {
      const value = data[0].value;
      return Boolean(value);
    } %}

NumberLiteral -> %number
    {% function (data) {
      const value = data[0].value;
      return Number(value);
    } %}

StringLiteral -> %string
    {% function (data) {
      return data[0].value;
    } %}

Literal -> (BooleanLiteral | NumberLiteral | StringLiteral)
    {% function (data) {
      return data[0][0];
    } %}
