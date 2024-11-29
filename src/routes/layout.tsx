import {component$, Slot, useStyles$} from "@builder.io/qwik";
import {routeLoader$} from "@builder.io/qwik-city";
import type {RequestHandler} from "@builder.io/qwik-city";
import { QwikCityNprogress } from '@quasarwork/qwik-city-nprogress'

import Header from "../components/starter/header/header";
import Footer from "../components/starter/footer/footer";

import styles from "./styles.css?inline";
import config from "~/config/dw";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "~/constants";

export const onGet: RequestHandler = async ({cacheControl}) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.dev/docs/caching/
    const cacheConfig = {
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 1 hour, revalidate on the server to get a fresh version of this page
        maxAge: 60 * 60,
    };

    cacheControl(cacheConfig);
    cacheControl(cacheConfig, "CDN-Cache-Control");
    cacheControl(cacheConfig, "Vercel-CDN-Cache-Control");
};

export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export const useCategories = routeLoader$(async ({cacheControl}) => {
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

    const response = await fetch(
        `${config.PUBLIC_API_ORIGIN}/api/commerce-sdk-react/category?id=${CAT_MENU_DEFAULT_ROOT_CATEGORY}&levels=${CAT_MENU_DEFAULT_NAV_SSR_DEPTH}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data.categories as unknown as Array<CommerceSDK.Category>;
});

export default component$(() => {
    useStyles$(styles);
    const categories = useCategories();

    return (
        <>
            <QwikCityNprogress />
            <Header categories={categories.value} />
            <main>
                <Slot/>
            </main>
            <Footer/>
        </>
    );
});
