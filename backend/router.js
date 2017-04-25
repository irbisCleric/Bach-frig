const KoaRouter = require("koa-route");
const firebase = require("./firebase");

const dbRef = firebase.database().ref("/fridge_food");

const frigeMethods = {
    log: snapshot => console.log("There are currently in a fridge: \n", snapshot.val()),
    connectToFoodList: () => dbRef.once("value", this.logFoodList),
    addFoodItem: (item) => {
        const ref = dbRef.push();

        return ref.set({
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
    backendApp.use(KoaRouter.post("/foods", (ctx) => {
        return frigeMethods.addFoodItem("apple")
            .then(() => (ctx.body = { msg: "Successfully added" }));
    }));

    backendApp.use((ctx) => {
        const reqContext = ctx;
        reqContext.body = "Default route";
    });

    // TODO: Add new food item
    // TODO: Get single food item
    // TODO: Update single food item
    // TODO: Remove single food item
};
