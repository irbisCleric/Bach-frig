const Koa = require("koa");
const KoaJson = require("koa-json");
const KoaRouter = require("koa-route");
const KoaCompress = require("koa-compress");
const cors = require("kcors");
const logger = require("koa-logger");

const backendApp = new Koa();
const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyA5_f4QPSvk8B2893CEbxvcszRroADH0bc",
    authDomain: "bach-frig.firebaseapp.com",
    databaseURL: "https://bach-frig.firebaseio.com",
    storageBucket: "bach-frig.appspot.com",
    messagingSenderId: "102781650181",
};

firebase.initializeApp(config);

backendApp.use(cors());
backendApp.use(KoaJson());
backendApp.use(logger());
backendApp.use(KoaCompress());

// Middleware normally takes two parameters (ctx, next),
// ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware.
// It returns a Promise with a then function for running code after completion.

backendApp.use(KoaRouter.get("/foods", (ctx) => {
    const reqContext = ctx;

    return firebase.database().ref("/frig").once("value")
        .then(snapshot => (reqContext.body = snapshot.val()));
}));

backendApp.use((ctx) => {
    const reqContext = ctx;
    reqContext.body = "Default route";
});

const SERVER_PORT = process.env.PORT || 8181;
backendApp.listen(SERVER_PORT);
console.log(`Server is running! Listening on port :${SERVER_PORT}`);
