const Koa = require("koa"),
    KoaCompress = require("koa-compress"),
    cors = require("kcors"),
    bodyParser = require("koa-body-parser"),
    backendApp = new Koa(),
    convert = require("koa-convert"), // Convert koa legacy middleware (https://github.com/koajs/koa/issues/533)
    colors = require("colors"),
    routings = require("./router");

colors.setTheme({
    silly: "rainbow",
    input: "grey",
    verbose: "cyan",
    prompt: "grey",
    info: "green",
    data: "grey",
    help: "cyan",
    warn: "yellow",
    debug: "blue",
    error: "red",
});

backendApp.use(convert(bodyParser()));
backendApp.use(convert(cors()));

// logger
backendApp.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ ctx.method } ${ ctx.url } - ${ ms } ms`.info);
});

backendApp.use(KoaCompress());

routings(backendApp);

const SERVER_PORT = process.env.PORT || 8181;
backendApp.listen(SERVER_PORT);

console.log(`Server is running! Listening on port :${ SERVER_PORT }`);
