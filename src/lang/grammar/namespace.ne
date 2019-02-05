@lexer lexer

VariableCall ->
  %lbracket Identifier %rbracket
    {% function (data) {
      return ({
        type: "Get",
        ctx: {
          identifier: data[1]
        }
      });
    } %}
