import {component$, Resource, useResource$} from "@builder.io/qwik";
import CategoryMenuPopover from "~/components/ecommerce/category-menu/category-menu-popover";
import config from "~/config/dw";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "~/constants";
import type {levelZeroCategoriesQuery} from "~/components/starter/header/header";

interface CategoryMenuProps {}

export default component$<CategoryMenuProps>(() => {
    const apiResource = useResource$(async () => {
        // await (new Promise((res) => setTimeout(() => res(''), 3000)));

        const response = await fetch(`${config.PUBLIC_API_ORIGIN}/api/commerce-sdk-react/category?id=${CAT_MENU_DEFAULT_ROOT_CATEGORY}&levels=${CAT_MENU_DEFAULT_NAV_SSR_DEPTH}`);
        const data = await response.json();

        return data.data as unknown as levelZeroCategoriesQuery;
    });

  return (
      <Resource
          value={apiResource}
          onPending={() => <p>Loading...</p>}
          onResolved={({categories}) => (
              <div class="flex-1">
                  <nav>
                      <div class="flex min-w-[20rem] pl-4 items-start">
                          <ul class="flex flex-wrap items-center">
                              {categories.map((category) => <CategoryMenuPopover key={category.name} category={category}/>)}
                          </ul>
                      </div>
                  </nav>
              </div>
          )}
          onRejected={(error) => <p>Error: {error.message}</p>}
      />
  );
});
