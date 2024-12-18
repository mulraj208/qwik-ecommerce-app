import {component$} from "@builder.io/qwik";
import CategoryMenuPopover from "~/components/ecommerce/category-menu/category-menu-popover";

interface CategoryMenuProps {
    categories: Array<CommerceSDK.Category>
}

export default component$<CategoryMenuProps>((props: CategoryMenuProps) => {
    const {categories} = props;

    return (
        <div class="hidden lg:flex">
            <div class="flex-1">
                <nav>
                    <div class="flex min-w-[20rem] pl-4 items-start">
                        <ul class="flex flex-wrap items-center">
                            {categories.map((category) =>
                                <CategoryMenuPopover key={category.name} category={category}/>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
});
