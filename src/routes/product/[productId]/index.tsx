import {component$} from "@builder.io/qwik";
import {type DocumentHead, routeLoader$} from "@builder.io/qwik-city";
import {fetchProductData} from "~/utils/fetch-product-data";
import {ProductView} from "~/routes/product/[productId]/product-view";

export const useProductData = routeLoader$(async ({cacheControl, params: { productId }}) => {
    const cacheConfig = {
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
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
