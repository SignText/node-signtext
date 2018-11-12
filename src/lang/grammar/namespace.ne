@lexer lexer

VariableCall -> %lbracket %identifier %rbracket
    {% function (data) {
      return ({
        type: "VariableCall",
        ctx: {
          identifier: data[1].value
        }
      });
    } %}
