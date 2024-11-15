import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {getApiClients} from "~/utils/commerce-api";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "~/constants";
import CategoryMenu from "~/components/ecommerce/category-menu/category-menu";

export interface levelZeroCategoriesQuery {
  categories: Array<CommerceSDK.Category>
}

export default component$(() => {
  const apiResource = useResource$(async () => {
    const {shopperProducts} = await getApiClients();

    return await shopperProducts.getCategory({
      parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    }) as unknown as levelZeroCategoriesQuery;
  });

  return (
    <header class="px-8 sticky top-0 z-10 bg-white shadow-lg text-black">
      <div class="max-w-[75rem] mx-auto">
        <div class="flex items-center">
          <Link href="/">
            <h2 class="text-[2rem] text-red-500">SYSTEMA</h2>
          </Link>
          <Resource
              value={apiResource}
              onPending={() => <p>Loading...</p>}
              onResolved={({ categories }) => (<CategoryMenu categories={categories} />)}
              onRejected={(error) => <p>Error: {error.message}</p>}
          />
          <div>
            <input
                class="border border-red-500 focus-visible:border-red-500 rounded-lg h-10 w-60"
                type="search"
                name="search-for-products"
                aria-label="Search for products..."
            />
          </div>

          <Link class="ml-4 text-black" href="/login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
});
