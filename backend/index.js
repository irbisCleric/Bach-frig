

const Koa = require("koa");
const KoaRouter = require("koa-route");
const KoaCompress = require("koa-compress");
const cors = require("kcors");
const logger = require("koa-logger");

const firebase = require("./firebase");

const backendApp = new Koa();

backendApp.use(cors());
backendApp.use(logger());
backendApp.use(KoaCompress());

// Middleware normally takes two parameters (ctx, next),
// ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware.
// It returns a Promise with a then function for running code after completion.

const frigeMethods = {
    log: snapshot => console.log("There are currently in a frige: \n", snapshot.val()),
    connectToFoodList: () => firebase.database().ref("/frig").once("value", this.logFoodList),
};

/**
 * Get full food list
 */
backendApp.use(KoaRouter.get("/foods", (ctx) => {
    const reqContext = ctx;
    return frigeMethods.connectToFoodList().then(snapshot => (reqContext.body = snapshot.val()));
}));

/**
 * Add new food item
 */
// backendApp.use(KoaRouter.post("/foods", (ctx) => {
//     const reqContext = ctx;
//     return frigeMethods.connectToFoodList().then(snapshot => (reqContext.body = snapshot.val()));
// }));

/**
 * Get single food item
 */
// backendApp.use(KoaRouter.get("/foods/:id", (ctx) => {
//     const reqContext = ctx;
//     return frigeMethods.connectToFoodList().then(snapshot => (reqContext.body = snapshot.val()));
// }));

/**
 * Update single food item
 */
// backendApp.use(KoaRouter.put("/foods/:id", (ctx) => {
//     const reqContext = ctx;
//     return frigeMethods.connectToFoodList().then(snapshot => (reqContext.body = snapshot.val()));
// }));

/**
 * Remove single food item
 */
// backendApp.use(KoaRouter.delete("/foods/:id", (ctx) => {
//     const reqContext = ctx;
//     return frigeMethods.connectToFoodList().then(snapshot => (reqContext.body = snapshot.val()));
// }));

backendApp.use((ctx) => {
    const reqContext = ctx;
    reqContext.body = "Default route";
});

const SERVER_PORT = process.env.PORT || 8181;
backendApp.listen(SERVER_PORT);
console.log(`Server is running! Listening on port :${SERVER_PORT}`);
