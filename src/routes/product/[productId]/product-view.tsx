import {component$} from '@builder.io/qwik';
import {useDerivedProduct} from "~/hooks/use-derived-product";
import {getDisplayPrice} from '~/utils/product-utils';
import SwatchGroup from "~/components/ecommerce/swatch-group";
import {ImageGallery} from "~/routes/product/[productId]/image-gallery";
import {ProductViewHeader} from "~/routes/product/[productId]/product-view-header";

interface ProductViewProps {
    productData: CommerceSDK.Product$0 | undefined;
}

export const ProductView = component$((props: ProductViewProps) => {
    const {productData: product} = props;
    const isProductPartOfSet = false;

    const derivedProduct = useDerivedProduct(product, isProductPartOfSet);
    // @ts-ignore
    const {basePrice, discountPrice} = getDisplayPrice(product);
    const isOutOfStock = derivedProduct.stockLevel === 0;

    return (
        <div class="flex flex-col lg:flex-row gap-8 justify-center">
            <div class="h-auto lg:w-[30rem]">
                {product ? (
                    <ImageGallery
                        // @ts-ignore
                        imageGroups={product.imageGroups || []}
                        selectedVariationAttributes={derivedProduct.variationParams}
                        product={product}
                    />
                ) : (
                    'Image Gallery Skeleton'
                )}
            </div>

            <div class="flex flex-col gap-8 max-w-[20rem]">
                <ProductViewHeader
                    basePrice={basePrice}
                    discountPrice={discountPrice}
                    name={product?.name}
                    product={product}
                    productCurrency={product?.currency}
                />

                {derivedProduct.variationAttributes &&
                    (derivedProduct.variationAttributes as Array<CommerceSDK.VariationAttribute>).map(
                        (variationAttribute) => (
                            <SwatchGroup
                                key={variationAttribute.id}
                                name={variationAttribute.name}
                                // @ts-ignore
                                selectedValue={variationAttribute.selectedValue}
                                values={variationAttribute.values || []}
                            />
                        )
                    )}

                {/*<ProductQuantityStepper*/}
                {/*    quantity={derivedProduct.quantity}*/}
                {/*    setQuantity={derivedProduct.setQuantity}*/}
                {/*    stepQuantity={derivedProduct.stepQuantity}*/}
                {/*    minOrderQuantity={derivedProduct.minOrderQuantity}*/}
                {/*    stockLevel={derivedProduct.stockLevel}*/}
                {/*/>*/}

                {derivedProduct.showInventoryMessage ? (
                    <p class="text-orange-600 text-left font-semibold mb-8">
                        {derivedProduct.inventoryMessage}
                    </p>
                ) : null}

                <button
                    class={`bg-blue-500 text-white px-4 py-2 rounded ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isOutOfStock}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
});
