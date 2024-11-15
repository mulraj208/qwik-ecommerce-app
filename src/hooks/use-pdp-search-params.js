import { useLocation } from '@builder.io/qwik-city';

export const usePDPSearchParams = (productId) => {
    const location = useLocation();
    const allParams = new URLSearchParams(location.url.search);
    const productParams = new URLSearchParams(allParams.get(productId) || '');

    return [allParams, productParams];
};
