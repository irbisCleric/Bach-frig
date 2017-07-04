export default {
    products: {
        getProducts: () => "/products",
        setProduct: () => "/products",
        deleteProduct: key => `/products/${key}`,
    },
};
