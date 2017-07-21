import * as koa from "koa";
import * as koaCompress from "koa-compress";
import * as kcors from "kcors";
import * as bodyparser from "koa-bodyparser";
import "colors";
import routings from "./router";

const convert = require("koa-convert"); // Convert koa legacy middleware (https://github.com/koajs/koa/issues/533)
const App = new koa();

App.use(convert(bodyparser()));
App.use(convert(kcors()));

// logger
App.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ ctx.method } ${ ctx.url } - ${ ms } ms`.green);
});

App.use(koaCompress());

routings(App);

const SERVER_PORT = process.env.PORT || 8181;
App.listen(SERVER_PORT);

console.log(`Server is running! Listening on port :${ SERVER_PORT }`.cyan);
