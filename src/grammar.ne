
@{%
  const moo = require("moo");

  const lexer = moo.compile({
    string: /\".*\"/
  });
%}

@lexer lexer

Chunk -> StringLiteral
    {% function (data) {
      return data[0];
    } %}

StringLiteral -> %string
    {% function (data) {
      return data;
    } %}
