@lexer lexer

BooleanLiteral -> (%true | %false)
    {% function (data) {
      // `value` will either be `"true"` or `"false"`. `Boolean(value)` will not
      // work as, in Javascript, `Boolean("false")` returns `true`.
      const value = data[0][0].value;
      return value === "true";
    } %}

NumberLiteral -> %number
    {% function (data) {
      const value = data[0].value;
      return Number.parseFloat(value);
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
