import {getApiClients} from "./commerce-api";
import {server$} from "@builder.io/qwik-city";

export const fetchProductData = server$(async (productId: string) => {
    try {
        const {shopperProducts} = await getApiClients();
        console.log('shopperProducts');

        return await shopperProducts.getProduct({
            parameters: {
                id: productId,
                allImages: true
            }
        });
    } catch (error) {
        console.error('Failed to fetch product data:', error);
    }
});
