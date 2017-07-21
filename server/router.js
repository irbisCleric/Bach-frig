const KoaRouter = require("koa-route"),
    firebase = require("./firebase"),
    dbRef = firebase.database().ref(),
    productsRef = dbRef.child("products");

const productMethods = {
    getProducts: async () => {
        const products = await productsRef.orderByChild("name").once("value"),
            sortedList = [];

        products.forEach(child => {
            sortedList.push(Object.assign({}, { key: child.getKey() }, child.val()));
        });

        return sortedList;
    },
    setProduct: async product => {
        const { isNew/* , key */ } = await productMethods.checkProductKnown(product);
        let msg = "";

        if (isNew) {
            msg = "OMG! Product already isNew";
        } else {
            msg = "Product successfully added";
            productsRef.push(product);
        }

        return msg;
    },
    getProduct: key => productsRef.child(`${ key }`).once("value"),
    removeProduct: key => productsRef.child(key),
    checkProductKnown: async product => {
        const name = product.name.trim();
        const products = (await productsRef.once("value")).val();
        const newProduct = {
            isNew: false,
            key: "",
        };

        for (const key in products) {
            if (newProduct.isNew) {
                break;
            }

            if (products.hasOwnProperty(key)) {

                if (products[key].name === name) {
                    newProduct.isNew = true;
                    newProduct.key = key;
                }
            }
        }

        return newProduct;
    },
};

// TODO: Removed this method after stabilised DB structure
/* dbRef.child("products").once("value", stamp => {
    // const struct = Object.keys(stamp.val());
    const obj = stamp.val();

    console.log(obj);

    // dbRef.child("fridge_food").set(null);
    // for (let i = 0; i < 5; i++) dbRef.child(struct[i]).remove();
}); */

module.exports = backendApp => {
    // Middleware normally takes two parameters (ctx, next),
    // ctx is the context for one request,
    // next is a function that is invoked to execute the downstream middleware.
    // It returns a Promise with a then function for running code after completion.

    /**
     * Get full products list
     */
    backendApp.use(KoaRouter.get("/products", async ctx => ctx.body = await productMethods.getProducts()));

    /**
     * Get single product item
     */
    backendApp.use(KoaRouter.get("/products/:id", async (ctx, next) => {
        const productItem = await productMethods.getProduct(next);

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
        productMethods
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
    backendApp.use(KoaRouter.post("/products", async ctx => {
        const msg = await productMethods.setProduct(ctx.request.body);

        ctx.res.statusCode = 200;
        ctx.body = {
            msg,
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
