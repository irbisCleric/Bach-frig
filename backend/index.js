const Koa = require("koa");
const KoaJson = require("koa-json");
const KoaRouter = require("koa-route");
const KoaCompress = require("koa-compress");
const cors = require('koa-cors');

const frigeData = require("./data/frige.json");
const backendApp = new Koa();
backendApp.use(cors());

backendApp.use(KoaJson());

backendApp
    .use(KoaRouter.get("/foods", (ctx) => {
        ctx.body = frigeData;
    }))
    .use((ctx) => {
        ctx.body = "Default route";
    });

backendApp
    .use(KoaCompress());

backendApp.listen(8181);

console.log("Server is running!");
