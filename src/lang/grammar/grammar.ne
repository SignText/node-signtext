
@{%
  const moo = require("moo");

  const lexer = moo.compile({
    number: /[0-9]+/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    false: /false/,
    true: /true/,

    identifier: /[a-zA-Z]+[a-zA-Z0-9_]*/,

    lbracket: "[",
    rbracket: "]",
    lparen: "(",
    rparen: ")",
    comma: ",",
    period: ".",
    ws: {
      match: /\s+/,
      lineBreaks: true
    }
  });
%}

@lexer lexer
@include "./src/lang/grammar/function.ne"
@include "./src/lang/grammar/literal.ne"
@include "./src/lang/grammar/namespace.ne"

Chunk -> Expression
    {% function (data) {
      return data[0];
    } %}

Expression ->
    _ (FunctionCall | Literal | VariableCall) _
    {% function (data) {
      return data[1][0];
    } %}

Identifier -> %identifier (%period %identifier):*
    {% function (data) {
      const derefs = (data[1] || []).map(x => x[1].value);
      return [data[0].value, ...derefs].join(".");
    } %}

_ -> __:*
    {% function (data) { return null } %}
__ -> %ws:+
    {% function (data) { return null } %}
