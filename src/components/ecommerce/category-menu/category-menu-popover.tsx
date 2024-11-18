import {$, component$, useSignal, useTask$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {categoryUrlBuilder} from "~/utils/urls";
import {Popover} from "~/components/ui";
import {usePopover} from "@qwik-ui/headless";
import {getApiClients} from "~/utils/commerce-api";
import LinksList from "~/components/ecommerce/category-menu/links-list";

interface CategoryMenuPopoverProps {
    category: CommerceSDK.Category
}

interface CategoriesProps {
    categories: Array<CommerceSDK.Category>
}

export default component$<CategoryMenuPopoverProps>(({category}) => {
    const popoverId = `programmatic-id-${category.name}`;
    const anchorRef = useSignal<HTMLElement | undefined>();
    const {showPopover, hidePopover} = usePopover(popoverId);
    const categories = useSignal<CategoriesProps>();
    const MAXIMUM_NUMBER_COLUMNS = 5

    const getCategories = $(async () => {
        const {shopperProducts} = await getApiClients();
        return await shopperProducts.getCategory({
            parameters: {
                id: category.id,
                levels: 2
            }
        }) as unknown as CategoriesProps;
    });

    useTask$(async () => {
        categories.value = await getCategories()
        // // Ensure the task runs only on the client side
        // if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        //     requestIdleCallback(async () => {
        //         categories.value = await getCategories()
        //     });
        // } else if (typeof window !== 'undefined') {
        //     console.log('here 1')
        //     // Fallback for environments without requestIdleCallback
        //     setTimeout(async () => {
        //         categories.value = await getCategories()
        //     }, 100); // Adjust delay if needed
        // }
    });

    const categoriesData = categories.value?.categories.map((item: CommerceSDK.Category) => {
        const {id, name} = item
        const items = item['categories'] as Array<CommerceSDK.Category>
        const heading = {
            href: categoryUrlBuilder(item),
            text: name,
            styles: 'font-bold text-black text-lg'
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const links = items
            ? items.map((item: CommerceSDK.Category) => {
                const {name} = item
                return {
                    href: categoryUrlBuilder(item),
                    text: name
                }
            })
            : []

        return {
            id,
            heading,
            links
        }
    })

    const columnLength = categories.value?.categories.length || 2
    const gridClass = `grid grid-cols-${columnLength > MAXIMUM_NUMBER_COLUMNS ? MAXIMUM_NUMBER_COLUMNS : columnLength} gap-y-2`;

    return (
        <li key={category.name}>
            <Popover.Root id={popoverId} bind:anchor={anchorRef} floating={true} manual>
                <div
                    ref={anchorRef}
                    onMouseEnter$={async () => await showPopover()}
                    onMouseLeave$={async () => await hidePopover()}
                >
                    <Popover.Trigger class="p-0 bg-transparent border-none " preventdefault:click>
                        <Link class="px-6 py-4 block text-lg text-black" href={categoryUrlBuilder(category)}>
                            {category.name}
                        </Link>
                    </Popover.Trigger>
                    {categoriesData ? (
                        <Popover.Panel class="w-full !left-0 rounded-none pb-6">
                            <div class={gridClass}>
                                {categoriesData.map(item => {
                                    return (
                                        <LinksList
                                            heading={item.heading}
                                            key={item.id}
                                            links={item.links}
                                        />
                                    )
                                })}
                            </div>
                        </Popover.Panel>
                    ) : null}
                </div>
            </Popover.Root>
        </li>
    );
});
