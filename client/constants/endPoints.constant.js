export default {
    products: {
        getProducts: () => "/products",
        setProduct: () => "/products",
        getProduct: key => `/products/${key}`,
        deleteProduct: key => `/products/${key}`,
    },
};
