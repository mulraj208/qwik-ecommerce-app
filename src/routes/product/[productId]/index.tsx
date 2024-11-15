import {component$, Resource, useResource$,} from "@builder.io/qwik";
import { type DocumentHead, useLocation } from "@builder.io/qwik-city";
import {fetchProductData} from "~/utils/fetch-product-data";
import {ProductView} from "~/routes/product/[productId]/product-view";

export default component$(() => {
    const { params: { productId } } = useLocation();
    const productResource = useResource$(async () => await fetchProductData(productId));

    return (
        <div class="bg-gray-100">
            <div class="container container-center">
                <Resource
                    value={productResource}
                    onPending={() => <p>Loading...</p>}
                    onResolved={(productData) => (<ProductView productData={productData} />)}
                    onRejected={(error) => <p>Error: {error.message}</p>}
                />
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Product Details Page",
};
