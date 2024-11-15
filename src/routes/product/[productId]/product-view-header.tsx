import { component$ } from '@builder.io/qwik';
import Breadcrumbs from "~/components/ecommerce/breadcrumbs";
import DisplayPrice from "~/components/ecommerce/display-price";

type ProductViewHeaderProps = {
    name?: string;
    product: CommerceSDK.Product$0 | undefined;
    productType?: CommerceSDK.ProductType;
    basePrice?: string | number;
    discountPrice?: number | null;
    productCurrency?: string;
};

export const ProductViewHeader = component$((props: ProductViewHeaderProps) => {
    const { name, productType, product, basePrice, discountPrice, productCurrency } = props;
    const isProductASet = productType?.set;

    return (
        <div class="flex flex-col items-start mr-4 gap-3">
            <Breadcrumbs product={product} />
            <h2 class="text-2xl font-semibold text-black">{name || ''}</h2>

            <DisplayPrice
                basePrice={basePrice}
                discountPrice={discountPrice}
                isProductASet={isProductASet}
                productCurrency={productCurrency}
            />
        </div>
    );
});
