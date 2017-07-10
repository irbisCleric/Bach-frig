const KoaRouter = require("koa-route"),
    asyncM = require("asyncawait/async"),
    awaitM = require("asyncawait/await"),
    firebase = require("./firebase"),
    dbRef = firebase.database().ref(),
    fridgeRef = dbRef.child("fridge_food");

const frigeMethods = {
    getProducts: () => {
        const allProducts = awaitM(fridgeRef.orderByChild("name").once("value")),
            sortedList = [];

        allProducts.forEach(child => {
            sortedList.push(Object.assign({}, { key: child.getKey() }, child.val()));
        });

        return sortedList;
    },
    addProduct: product => fridgeRef.push().set(product),
    removeProduct: key => fridgeRef.child(key),
    getProduct: key => awaitM(dbRef.child(`/fridge_food/${ key }`).once("value")),
};

module.exports = backendApp => {
    // Middleware normally takes two parameters (ctx, next),
    // ctx is the context for one request,
    // next is a function that is invoked to execute the downstream middleware.
    // It returns a Promise with a then function for running code after completion.

    /**
     * Get full products list
     */
    backendApp.use(KoaRouter.get("/products", ctx => ctx.body = frigeMethods.getProducts()));

    /**
     * Get single product item
     */
    backendApp.use(KoaRouter.get("/products/:id", asyncM((ctx, next) => {
        const productItem = frigeMethods.getProduct(next);

        ctx.res.statusCode = 200;
        ctx.body = {
            msg: "Single item loaded successful!",
            status: ctx.res.statusCode,
            product: Object.assign({}, productItem.val()),
        };
        ctx.type = "application/json; charset=utf-8";
    }
    )));

    /**
     * Remove single product item
     */
    backendApp.use(KoaRouter.del("/products/:id", (ctx, next) => {
        frigeMethods
            .removeProduct(next)
            .remove();

        ctx.res.statusCode = 200;
        ctx.body = {
            msg: "Item removed successful!",
            status: ctx.res.statusCode,
        };
        ctx.type = "application/json; charset=utf-8";
    }));

    /**
     * Create new product item
     */
    backendApp.use(KoaRouter.post("/products", ctx => {
        frigeMethods.addProduct(ctx.request.body);

        ctx.res.statusCode = 200;
        ctx.body = {
            msg: "Successfully added",
            status: ctx.res.statusCode,
        };
        ctx.type = "application/json; charset=utf-8";
    }));

    backendApp.use(ctx => {
        const reqContext = ctx;
        reqContext.body = "Default route";
    });

    // TODO: Add new food item
    // TODO: Update single food item
};
