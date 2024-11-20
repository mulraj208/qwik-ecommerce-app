import pkg from 'commerce-sdk-isomorphic/lib/index.cjs.js';
// @ts-ignore
const {ShopperBaskets, ShopperContexts, ShopperCustomers, ShopperExperience, ShopperGiftCertificates, ShopperLogin, ShopperOrders, ShopperProducts, ShopperPromotions, ShopperSearch, ShopperSeo, helpers} = pkg.default || pkg;

import config from '~/config/dw'

export const getApiClients = async () => {
    const commerceApiConfig = {
        proxy: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/mobify/proxy/api`,
        parameters: {
            clientId: config.CLIENT_ID,
            organizationId: config.ORGANIZATION_ID,
            shortCode: config.SHORT_CODE,
            siteId: config.SITE_ID,
            locale: "en-US",
            currency: "USD",
        },
        throwOnBadResponse: true
    }

    // @ts-ignore
    const {access_token} = await helpers.loginGuestUser(
        new ShopperLogin(commerceApiConfig),
        {redirectURI: `${commerceApiConfig.proxy}/callback`}
    )

    const configWithAccessToken = {
        ...config,
        headers: {authorization: `Bearer ${access_token}`},
    }

    return {
        shopperBaskets: new ShopperBaskets(configWithAccessToken),
        shopperContexts: new ShopperContexts(configWithAccessToken),
        shopperCustomers: new ShopperCustomers(configWithAccessToken),
        shopperExperience: new ShopperExperience(configWithAccessToken),
        shopperGiftCertificates: new ShopperGiftCertificates(configWithAccessToken),
        shopperLogin: new ShopperLogin(configWithAccessToken),
        shopperOrders: new ShopperOrders(configWithAccessToken),
        shopperProducts: new ShopperProducts(configWithAccessToken),
        shopperPromotions: new ShopperPromotions(configWithAccessToken),
        shopperSearch: new ShopperSearch(configWithAccessToken),
        shopperSeo: new ShopperSeo(configWithAccessToken)
    }
}
