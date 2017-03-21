const Koa = require("koa");
const KoaJson = require("koa-json");
const KoaRouter = require("koa-route");
const KoaCompress = require("koa-compress");
const cors = require('koa-cors');

const frigeData = require("./data/frige.json");
const backendApp = new Koa();
const firebase = require("firebase");

backendApp.use(cors());

backendApp.use(KoaJson());

const config = {
    apiKey: "AIzaSyA5_f4QPSvk8B2893CEbxvcszRroADH0bc",
    authDomain: "bach-frig.firebaseapp.com",
    databaseURL: "https://bach-frig.firebaseio.com",
    storageBucket: "bach-frig.appspot.com",
    messagingSenderId: "102781650181",
};

firebase.initializeApp(config);

backendApp
    .use(KoaRouter.get("/foods", (ctx) => {
        return firebase.database().ref("/frig").once("value")
            .then(snapshot => (ctx.body = snapshot.val()));
    }))
    .use((ctx) => {
        ctx.body = "Default route";
    });

backendApp
    .use(KoaCompress());

backendApp.listen(8181);

console.log("Server is running!");
