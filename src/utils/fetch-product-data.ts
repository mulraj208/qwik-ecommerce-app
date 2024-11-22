import {server$} from "@builder.io/qwik-city";

export const fetchProductData = server$(async (productId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/commerce-sdk-react/product?productId=${productId}`);
        const data = await response.json();

        // @ts-ignore
        return data.data;
    } catch (error) {
        console.error('Failed to fetch product data:', error);
    }
});
