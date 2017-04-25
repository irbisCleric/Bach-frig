const KoaRouter = require("koa-route");
const firebase = require("./firebase");

const dbRef = firebase.database().ref("/fridge_food");

const frigeMethods = {
    connectToFoodList: () => dbRef.once("value"),
    addFoodItem: (item) => {
        const ref = dbRef.push();

        return ref.set({
            amount: 1,
            title: item,
        });
    },
    removeFoodItem: key => firebase.database().ref(`/fridge_food/${key}`),
    getFoodItem: key => firebase.database().ref(`/fridge_food/${key}`).once("value"),
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
     * Get single food item
     */
    backendApp.use(KoaRouter.get("/foods/:id", (ctx, next) => {
        const reqContext = ctx;
        frigeMethods
            .getFoodItem(next)
            .then((snapshot) => {
                console.log(snapshot.val());
            });

        reqContext.res.statusCode = 200;
        reqContext.body = {
            msg: "Single item loaded successful!",
            status: reqContext.res.statusCode,
        };
        reqContext.type = "application/json; charset=utf-8";
    }));

    /**
     * Remove single food item
     */
    backendApp.use(KoaRouter.del("/foods/:id", (ctx, next) => {
        const reqContext = ctx;
        frigeMethods
            .removeFoodItem(next)
            .remove();

        reqContext.res.statusCode = 200;
        reqContext.body = {
            msg: "Item removed successful!",
            status: reqContext.res.statusCode,
        };
        reqContext.type = "application/json; charset=utf-8";
    }));

    /**
     * Post new food item
     */
    backendApp.use(KoaRouter.post("/foods", (ctx, next) => {
        const reqContext = ctx;
        frigeMethods.addFoodItem("Banana");

        reqContext.res.statusCode = 200;
        reqContext.body = {
            msg: "Successfully added",
            status: reqContext.res.statusCode,
        };
        reqContext.type = "application/json; charset=utf-8";
    }));

    backendApp.use((ctx) => {
        const reqContext = ctx;
        reqContext.body = "Default route";
    });

    // TODO: Add new food item
    // TODO: Update single food item
};
