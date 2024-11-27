import {component$} from "@builder.io/qwik";
import {type DocumentHead, routeLoader$} from "@builder.io/qwik-city";
import {fetchProductData} from "~/utils/fetch-product-data";
import {ProductView} from "~/routes/product/[productId]/product-view";

export const useProductData = routeLoader$(async ({cacheControl, params: { productId }}) => {
    const cacheConfig = {
        // Cache for 1 hour
        maxAge: 3600,
        // Revalidate stale data
        staleWhileRevalidate: 3600,
    }

    // Set caching policies
    cacheControl(cacheConfig);
    cacheControl(cacheConfig, "CDN-Cache-Control");
    cacheControl(cacheConfig, "Vercel-CDN-Cache-Control");

    return await fetchProductData(productId) as CommerceSDK.Product$0;
});

export default component$(() => {
    const productData = useProductData();

    return (
        <div class="bg-gray-100">
            <div class="container container-center">
                <ProductView productData={productData.value} />
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Product Details Page",
};
