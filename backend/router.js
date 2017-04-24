const KoaRouter = require("koa-route");
const firebase = require("./firebase");

const dbRef = firebase.database().ref("/fridge_food");

const frigeMethods = {
    log: snapshot => console.log("There are currently in a fridge: \n", snapshot.val()),
    connectToFoodList: () => dbRef.once("value", this.logFoodList),
    addFoodItem: (item) => {
        const ref = dbRef.push();

        ref.set({
            amount: 1,
            title: item,
        });
    },
};

module.exports = (backendApp) => {
    // Middleware normally takes two parameters (ctx, next),
    // ctx is the context for one request,
    // next is a function that is invoked to execute the downstream middleware.
    // It returns a Promise with a then function for running code after completion.

    /**
     * Get full food list
     */
    backendApp.use(KoaRouter.get("/foods", (ctx) => {
        const reqContext = ctx;
        return frigeMethods.connectToFoodList()
            .then(snapshot => (reqContext.body = snapshot.val()));
    }));

    /**
     * Post new food item
     */
    backendApp.use(KoaRouter.post("/foods", (ctx, next) => {
        console.log(JSON.stringify(ctx, null, 2));
        return frigeMethods.addFoodItem("apple")
            .then(() => (ctx));
    }));

    backendApp.use((ctx) => {
        const reqContext = ctx;
        reqContext.body = "Default route";
    });

    /**
     * Add new food item
     */
    // backendApp.use(KoaRouter.post("/foods", (ctx) => {
    //     const reqContext = ctx;
    //     return frigeMethods.connectToFoodList()
    //        .then(snapshot => (reqContext.body = snapshot.val()));
    // }));

    /**
     * Get single food item
     */
    // backendApp.use(KoaRouter.get("/foods/:id", (ctx) => {
    //     const reqContext = ctx;
    //     return frigeMethods.connectToFoodList()
    //          .then(snapshot => (reqContext.body = snapshot.val()));
    // }));

    /**
     * Update single food item
     */
    // backendApp.use(KoaRouter.put("/foods/:id", (ctx) => {
    //     const reqContext = ctx;
    //     return frigeMethods.connectToFoodList()
    //  .then(snapshot => (reqContext.body = snapshot.val()));
    // }));

    /**
     * Remove single food item
     */
    // backendApp.use(KoaRouter.delete("/foods/:id", (ctx) => {
    //     const reqContext = ctx;
    //     return frigeMethods.connectToFoodList()
    //  .then(snapshot => (reqContext.body = snapshot.val()));
    // }));
};
