import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import { LuMenu } from "@qwikest/icons/lucide";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "~/constants";
import CategoryMenu from "~/components/ecommerce/category-menu/category-menu";

export interface levelZeroCategoriesQuery {
  categories: Array<CommerceSDK.Category>
}

export default component$(() => {
  const apiResource = useResource$(async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/commerce-sdk-react/category?id=${CAT_MENU_DEFAULT_ROOT_CATEGORY}&levels=${CAT_MENU_DEFAULT_NAV_SSR_DEPTH}`);
    const data = await response.json();

    return data.data as unknown as levelZeroCategoriesQuery;
  });

  return (
    <header class="px-3 lg:px-8 sticky top-0 z-10 bg-white shadow-lg text-black">
      <div class="max-w-[75rem] mx-auto">
        <div class="lg:flex items-center">
          <div class="flex items-center pt-3 lg:pt-0">
            <LuMenu class="w-6 h-6 text-red-500 lg:hidden mr-4" />
            <Link href="/">
              <h2 class="text-[2rem] text-red-500">SYSTEMA</h2>
            </Link>
          </div>

          <div class="hidden lg:block">
            <Resource
                value={apiResource}
                onPending={() => <p>Loading...</p>}
                onResolved={({ categories }) => (<CategoryMenu categories={categories} />)}
                onRejected={(error) => <p>Error: {error.message}</p>}
            />
          </div>

          <div class="py-3 lg:py-0">
            <input
                class="border border-red-500 focus-visible:border-red-500 rounded-lg h-10 w-60 w-full"
                type="search"
                name="search-for-products"
                aria-label="Search for products..."
            />
          </div>

          <Link class="ml-4 text-black hidden lg:block" href="/login">Login</Link>
        </div>
      </div>
    </header>
  );
});
