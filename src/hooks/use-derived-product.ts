// @ts-nocheck
/* eslint qwik/valid-lexical-scope: 0 */
import {useStore, useTask$} from '@builder.io/qwik';
import {useVariant} from './use-variant';
import {useVariationParams} from './use-variation-params';
import {getDisplayPrice} from '~/utils/product-utils';
import {useVariationAttributes} from "~/hooks/use-variation-attribute";

const OUT_OF_STOCK = 'OUT_OF_STOCK';
const UNFULFILLABLE = 'UNFULFILLABLE';

export const useDerivedProduct = (product, isProductPartOfSet = false) => {
    const store = useStore({
        showLoading: !product,
        quantity: product?.quantity || product?.minOrderQuantity || 1,
        variationParams: useVariationParams(product, isProductPartOfSet),
        variationAttributes: useVariationAttributes(product, isProductPartOfSet),
        variant: useVariant(product, isProductPartOfSet),
        stockLevel: product?.inventory?.stockLevel || 0,
        stepQuantity: product?.stepQuantity || 1,
        minOrderQuantity: product?.inventory?.stockLevel > 0 ? product?.minOrderQuantity || 1 : 0,
        inventoryMessage: '',
        showInventoryMessage: false,
        basePrice: 0,
        discountPrice: 0
    });

    const {variationParams, variationAttributes, stockLevel, quantity} = store;

    // Calculate derived values
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isOutOfStock = !stockLevel || (!store.variant && Object.keys(variationParams).length === variationAttributes.length);
    const unfulfillable = stockLevel < quantity;
    const inventoryMessages = {
        [OUT_OF_STOCK]: 'Out of stock',
        [UNFULFILLABLE]: `Only ${stockLevel} left!`
    };

    useTask$(() => {
        const {basePrice, discountPrice} = getDisplayPrice(product);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        store.showInventoryMessage = store.variant && (isOutOfStock || unfulfillable);
        store.inventoryMessage = (isOutOfStock && inventoryMessages[OUT_OF_STOCK]) || (unfulfillable && inventoryMessages[UNFULFILLABLE]);
        store.basePrice = basePrice;
        store.discountPrice = discountPrice;

        // Update quantity when `initialQuantity` changes
        if (product?.quantity !== store.quantity) {
            store.quantity = product?.quantity || product?.minOrderQuantity || 1;
        }
    });

    return store;
};
