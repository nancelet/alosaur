import { Middleware } from "../../../src/decorator/Middleware.ts";
import { MiddlewareTarget } from "../../../src/models/middleware-target.ts";
import { Context } from "../../../src/models/context.ts";

@Middleware(new RegExp("/"))
export class Increment2Middleware implements MiddlewareTarget<number> {
  onPreRequest(context: Context<number>) {
    // @ts-ignore
    context.state += 1;
  }

  onPostRequest(context: Context<number>) {
  }
}
