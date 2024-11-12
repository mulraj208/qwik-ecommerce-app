import {getApiClients} from "./commerce-api";

export async function fetchProductData(productId: string) {
    try {
        const {shopperProducts} = await getApiClients();

        return await shopperProducts.getProduct({
            parameters: {
                id: productId,
                allImages: true
            }
        });
    } catch (error) {
        console.error('Failed to fetch product data:', error);
    }
}
