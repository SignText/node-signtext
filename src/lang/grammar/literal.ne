@lexer lexer

BooleanLiteral -> (%true | %false)
    {% function (data) {
      const value = data[0][0].value;
      return Boolean(value);
    } %}

NumberLiteral -> %number
    {% function (data) {
      const value = data[0].value;
      return Number(value);
    } %}

StringLiteral -> %string
    {% function (data) {
      const raw = data[0].value;
      return raw.substring(1, raw.length - 1);
    } %}

Literal -> (BooleanLiteral | NumberLiteral | StringLiteral)
    {% function (data) {
      return data[0][0];
    } %}
