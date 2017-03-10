const Koa = require("koa");
const KoaJson = require("koa-json");
const KoaRouter = require("koa-router")();
const KoaBody = require("koa-body")();

const backendApp = new Koa();

const frigeData = require("./data/frige.json");

backendApp.use(KoaJson());

// KoaRouter.post("/frige/foods", KoaBody,  function *(next) {
//     console.log(this.request.body);
//     // => POST body
//     this.body = frigeData;
// });

// backendApp.use(KoaRouter.routes());

backendApp.use((ctx) => {
    ctx.body = frigeData;
});

backendApp.listen(8888);
