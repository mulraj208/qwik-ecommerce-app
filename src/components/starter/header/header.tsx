import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import { LuMenu } from "@qwikest/icons/lucide";
import CategoryMenu from "~/components/ecommerce/category-menu/category-menu";

export interface levelZeroCategoriesQuery {
  categories: Array<CommerceSDK.Category>
}

export default component$(() => {
  return (
    <header class="px-3 lg:px-8 sticky top-0 z-10 bg-white shadow-lg text-black flex items-center lg:min-h-[60px]">
      <div class="max-w-[75rem] mx-auto w-full">
        <div class="lg:flex items-center">
          <div class="flex items-center pt-3 lg:pt-0 h-full">
            <LuMenu class="w-6 h-6 text-red-500 lg:hidden mr-4" />
            <Link href="/">
              <h2 class="text-[2rem] text-red-500">SYSTEMA</h2>
            </Link>
          </div>

          <CategoryMenu />

          <div class="py-3 lg:py-0 lg:ml-auto">
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
