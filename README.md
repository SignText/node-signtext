[GitHub-Repository-URL]: https://github.com/mgthomas99/node-signtext
[NPM-Package-URL]: https://www.npmjs.com/package/signtext

[NPM-Package-Version-Shield-URL]: https://img.shields.io/npm/v/signtext.svg?style=flat-square
[License-Shield-URL]: https://img.shields.io/github/license/mgthomas99/node-signtext.svg?style=flat-square

# node-signtext

[![NPM][NPM-Package-Version-Shield-URL]][NPM-Package-URL]
[![GitHub][License-Shield-URL]][GitHub-Repository-URL]

SignText is a powerful & simple inline scripting language for interacting with
its implementation language in a controlled environment.

```typescript
import * as st from "signtext";

const rt = new st.Runtime();
rt.eval(`[sum](1, 2, 3)`, new st.Context({
  sum(...args) {
    return args.reduce((x, r) => r + x, 0);
  }
})).then(console.log);
// Prints '6'
```

## Build & Test

```sh
npm install
gulp build
```

This will build the source code into `build/`.

```sh
npm test
```

This will execute tests and output the results to the standard output stream.

## License

See the `LICENSE` file for license information.
