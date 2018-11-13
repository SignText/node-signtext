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
      function escape(str) {
        return str
            .replace(/\\"/g, "\"");
      }

      let raw = data[0].value;
      raw = raw.substring(1, raw.length - 1);
      return escape(raw);
    } %}

Literal -> (BooleanLiteral | NumberLiteral | StringLiteral)
    {% function (data) {
      return data[0][0];
    } %}
