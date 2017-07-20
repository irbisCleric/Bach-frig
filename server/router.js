const KoaRouter = require("koa-route"),
    firebase = require("./firebase"),
    dbRef = firebase.database().ref(),
    productsRef = dbRef.child("products");

const frigeMethods = {
    getProducts: async () => {
        const allProducts = await productsRef.orderByChild("name").once("value"),
            sortedList = [];

        allProducts.forEach(child => {
            sortedList.push(Object.assign({}, { key: child.getKey() }, child.val()));
        });

        return sortedList;
    },
    addProduct: product => productsRef.push().set(product),
    removeProduct: key => productsRef.child(key),
    getProduct: key => productsRef.child(`${ key }`).once("value"),
};

// TODO: Removed this method after stabilised DB structure
/* dbRef.child("fridge_food").once("value", stamp => {
    const struct = Object.keys(stamp.val());
    console.log(struct);

    dbRef.child("fridge_food").set(null);

    // for (let i = 0; i < 5; i++)
    //     dbRef.child(struct[i]).remove();
}); */

// dbRef.child("groups").child("-KpUQDkTa026IW5ELia4").remove();

module.exports = backendApp => {
    // Middleware normally takes two parameters (ctx, next),
    // ctx is the context for one request,
    // next is a function that is invoked to execute the downstream middleware.
    // It returns a Promise with a then function for running code after completion.

    /**
     * Get full products list
     */
    backendApp.use(KoaRouter.get("/products", async ctx => ctx.body = await frigeMethods.getProducts()));

    /**
     * Get single product item
     */
    backendApp.use(KoaRouter.get("/products/:id", async (ctx, next) => {
        const productItem = await frigeMethods.getProduct(next);

        ctx.res.statusCode = 200;
        ctx.body = {
            msg: "Single item loaded successful!",
            status: ctx.res.statusCode,
            product: Object.assign({}, productItem.val()),
        };
        ctx.type = "application/json; charset=utf-8";
    }
    ));

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
