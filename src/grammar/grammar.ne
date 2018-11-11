
@{%
  const moo = require("moo");

  const lexer = moo.compile({
    number: /[0-9]+/,
    string: /\".*\"/,

    identifier: /[a-zA-Z]+[a-zA-Z0-9_]*/,

    false: "false",
    true: "true",

    lbracket: "[",
    rbracket: "]",
    lparen: "(",
    rparen: ")",
    comma: ","
  });
%}

@lexer lexer
@include "./src/grammar/function.ne"
@include "./src/grammar/literal.ne"

Chunk -> (FunctionCall | Literal)
    {% function (data) {
      return data[0];
    } %}
