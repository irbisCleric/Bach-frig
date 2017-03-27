const Koa = require("koa");
const KoaCompress = require("koa-compress");
const cors = require("kcors");
const logger = require("koa-logger");

const backendApp = new Koa();

const routings = require("./router");

backendApp.use(cors());
backendApp.use(logger());
backendApp.use(KoaCompress());

routings(backendApp);

const SERVER_PORT = process.env.PORT || 8181;
backendApp.listen(SERVER_PORT);
console.log(`Server is running! Listening on port :${SERVER_PORT}`);
