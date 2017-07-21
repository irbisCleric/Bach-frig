import * as routes from "koa-route";
import * as koa from "koa";
import firebase from "./firebase";

const dbRef = firebase.database().ref(),
    productsRef = dbRef.child("products");

type Product = {
    name: string,
    amount: string
};

/**
 * DataSnapshot (Firebase v3)
 * 
 * @interface DataSnapshotExtended
 * @extends {firebase.database.DataSnapshot}
  */
interface DataSnapshotExtended extends firebase.database.DataSnapshot {
    getKey: () => string
}

const productMethods = {
    getProducts: async () => {
        const products = await productsRef.orderByChild("name").once("value"),
            sortedList: Product[] = [];

        products.forEach((child: DataSnapshotExtended) => {
            sortedList.push(Object.assign({}, { key: child.getKey() }, child.val()));
        });

        return sortedList;
    },
    setProduct: async (product: Product) => {
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
    getProduct: (key: string) => productsRef.child(`${ key }`).once("value"),
    removeProduct: (key: string) => productsRef.child(key),
    checkProductKnown: async (product: Product) => {
        const name = product.name.trim().toLowerCase();
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

/**
 * Routes
 * 
 * Middleware normally takes two parameters (ctx, next),
 * ctx is the context for one request,
 * next is a function that is invoked to execute the downstream middleware.
 * It returns a Promise with a then function for running code after completion.
 */
export default (App: koa) => {

    // Get all products
    App.use(routes.get("/products", async ctx => ctx.body = await productMethods.getProducts()));

    // Get single product
    App.use(routes.get("/products/:id", async (ctx, next) => {
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

    // Remove single product
    App.use(routes.del("/products/:id", (ctx, next) => {
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

    // Create new product
    App.use(routes.post("/products", async ctx => {
        const msg = await productMethods.setProduct(ctx.request.body);

        ctx.res.statusCode = 200;
        ctx.body = {
            msg,
            status: ctx.res.statusCode,
        };
        ctx.type = "application/json; charset=utf-8";
    }));

    App.use(ctx => {
        const reqContext = ctx;
        reqContext.body = "Default route";
    });

    // TODO: Add new food item
    // TODO: Update single food item
};
