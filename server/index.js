const Koa = require("koa"),
    KoaCompress = require("koa-compress"),
    cors = require("kcors"),
    logger = require("koa-logger"),
    bodyParser = require("koa-body-parser"),
    backendApp = new Koa(),
    routings = require("./router");

backendApp.use(bodyParser());
backendApp.use(cors());
backendApp.use(logger());
backendApp.use(KoaCompress());

routings(backendApp);

const SERVER_PORT = process.env.PORT || 8181;
backendApp.listen(SERVER_PORT);

console.log(`Server is running! Listening on port :${ SERVER_PORT }`);
