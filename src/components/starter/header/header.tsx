import {component$, Resource, useResource$} from "@builder.io/qwik";
import {getApiClients} from "~/utils/commerce-api";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "~/constants";
import {categoryUrlBuilder} from "~/utils/urls";

export interface levelZeroCategoriesQuery {
  categories: Array<CommerceSDK.Category>
}

export default component$(() => {
  const apiResource = useResource$(async () => {
    const {shopperProducts} = await getApiClients();
    const levelZeroCategoriesQuery =  await shopperProducts.getCategory({
      parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    }) as unknown as levelZeroCategoriesQuery;

    console.log(levelZeroCategoriesQuery);

    return levelZeroCategoriesQuery;
  });

  return (
    <header class="px-8 sticky top-0 z-10 bg-white shadow-lg text-black">
      <div class="max-w-[75rem] mx-auto">
        <div class="flex items-center">
          <a class="" href="/">
            <h2 class="text-[2rem] text-red-500">SYSTEMA</h2>
          </a>
          <Resource
              value={apiResource}
              onPending={() => <p>Loading...</p>}
              onResolved={({ categories }) => (
                  <div class="flex-1">
                    <nav>
                      <div class="flex min-w-[20rem] pl-4 items-start">
                        <ul class="flex items-center">
                          {categories.map((category) => (
                              <li>
                                <a class="px-6 py-4 block text-lg text-black" href={categoryUrlBuilder(category)}>
                                  {category.name}
                                </a>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </nav>
                  </div>
              )}
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

          <a class="ml-4 text-black" href="/login">
            Login
          </a>
        </div>
      </div>
    </header>
  );
});
