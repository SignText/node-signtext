import { Mutex } from "async-mutex";
import * as nearley from "nearley";

import { Namespace } from "./object/namespace";

const grammar = nearley.Grammar.fromCompiled(require("./grammar/grammar"));

export class Runtime {

  private readonly parser: nearley.Parser;
  private readonly mutex: Mutex;

  public constructor() {
    this.parser = new nearley.Parser(grammar);
    this.mutex = new Mutex();
  }

  public eval(x: string, ns?: Namespace)
  : (Promise<string>) {
    if (typeof ns === "undefined") return this.eval(x, {});

    return this.mutex.acquire().then((done) => {
      this.parser.feed(x);
      this.parser.finish();

      const result = this.parser.results[0];
      done();
      return result;
    });
  }

}
