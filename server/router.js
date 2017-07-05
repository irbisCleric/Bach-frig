const KoaRouter = require("koa-route");
const firebase = require("./firebase");

const dbRef = firebase.database().ref();
const fridgeRef = dbRef.child("fridge_food");

const frigeMethods = {
    getProducts: () => fridgeRef.orderByChild("name").once("value").then((shot) => {
        let sortedList = [];
        shot.forEach(child => { sortedList.push(Object.assign({}, { key: child.getKey() }, child.val())); });

        return sortedList;
    }),
    addProduct: (item) => {
        const ref = dbRef.push();
        return ref.set(item);
    },
    removeProduct: key => dbRef.child(`/fridge_food/${key}`),
    getProduct: key => dbRef.child(`/fridge_food/${key}`).once("value"),
};

module.exports = (backendApp) => {
    // Middleware normally takes two parameters (ctx, next),
    // ctx is the context for one request,
    // next is a function that is invoked to execute the downstream middleware.
    // It returns a Promise with a then function for running code after completion.

    /**
     * Get full products list
     */
    backendApp.use(
        KoaRouter
            .get("/products", ctx => frigeMethods.getProducts().then(list => (ctx.body = list)))
    );

    /**
     * Get single product item
     */
    backendApp.use(KoaRouter.get("/products/:id", (ctx, next) => {
        const reqContext = ctx;
        frigeMethods
            .getProduct(next)
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
     * Remove single product item
     */
    backendApp.use(KoaRouter.del("/products/:id", (ctx, next) => {
        const reqContext = ctx;
        frigeMethods
            .removeProduct(next)
            .remove();

        reqContext.res.statusCode = 200;
        reqContext.body = {
            msg: "Item removed successful!",
            status: reqContext.res.statusCode,
        };
        reqContext.type = "application/json; charset=utf-8";
    }));

    /**
     * Create new product item
     */
    backendApp.use(KoaRouter.post("/products", (ctx, next) => {
        const reqContext = ctx;
        frigeMethods.addProduct(ctx.request.body);

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
