
@{%
  const moo = require("moo");

  const lexer = moo.compile({
    number: /[0-9]+/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,

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
@include "./src/lang/grammar/function.ne"
@include "./src/lang/grammar/literal.ne"
@include "./src/lang/grammar/namespace.ne"

Chunk -> (FunctionCall | Literal)
    {% function (data) {
      return data[0];
    } %}
