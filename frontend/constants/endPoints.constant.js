export default {
    fridge: {
        getFridgeItems: () => "/foods",
        setFridgeItem: () => "/foods",
        deleteSingleFridgeItem: key => `/foods/${key}`,
    },
};
