// @ts-nocheck

import {useVariationParams} from './use-variation-params';
import {usePDPSearchParams} from './use-pdp-search-params';
import {updateSearchParams} from '~/utils/urls';

const getVariantValueSwatch = (product, variationValue) => {
    const {imageGroups = []} = product;
    const imageGroup = imageGroups
        .filter(({viewType}) => viewType === 'swatch')
        .find(({variationAttributes = []}) => {
            const colorAttribute = variationAttributes.find(({id}) => id === 'color');
            const colorValues = colorAttribute?.values || [];
            return colorValues.some(({value}) => value === variationValue.value);
        });
    return imageGroup?.images?.[0];
};

const buildVariantValueHref = ({pathname, existingParams, newParams, productId, isProductPartOfSet}) => {
    const [allParams, productParams] = existingParams;

    if (isProductPartOfSet) {
        updateSearchParams(productParams, newParams);
        allParams.set(productId, productParams.toString());
    } else {
        updateSearchParams(allParams, newParams);
    }

    return `/product/${pathname}?${allParams.toString()}`;
};

const isVariantValueOrderable = (product, variationParams) => {
    return product.variants?.some(
        ({variationValues, orderable}) =>
            Object.keys(variationParams).every(
                (key) => variationValues[key] === variationParams[key]
            ) && orderable
    );
};

export function useVariationAttributes(product: CommerceSDK.Product$0 | undefined, isProductPartOfSet = false) {
    const variationParams = useVariationParams(product, isProductPartOfSet);
    const existingParams = usePDPSearchParams(product?.id);

    return product?.variationAttributes?.map((variationAttribute) => {
        return {
            ...variationAttribute,
            selectedValue: {
                name: variationAttribute.values?.find(({value}) => value === variationParams?.[variationAttribute.id])?.name,
                value: variationParams?.[variationAttribute.id],
            },
            values: variationAttribute.values?.map((value) => {
                const params = {
                    ...variationParams,
                    [variationAttribute.id]: value.value,
                };
                return {
                    ...value,
                    image: getVariantValueSwatch(product, value),
                    href: buildVariantValueHref({
                        pathname: product.id,
                        existingParams,
                        newParams: params,
                        productId: product.id,
                        isProductPartOfSet,
                    }),
                    orderable: isVariantValueOrderable(product, params),
                };
            }),
        }
    });
}
