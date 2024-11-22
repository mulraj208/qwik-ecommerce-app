import {component$, useSignal, useTask$} from "@builder.io/qwik";
import {Link, server$} from "@builder.io/qwik-city";
import {categoryUrlBuilder} from "~/utils/urls";
import {Popover} from "~/components/ui";
import {usePopover} from "@qwik-ui/headless";
import LinksList from "~/components/ecommerce/category-menu/links-list";
import config from '~/config/dw';

interface CategoryMenuPopoverProps {
    category: CommerceSDK.Category
}

interface CategoriesProps {
    categories: Array<CommerceSDK.Category> | undefined
}

const getCategories = server$(async (id: string) => {
    const response = await fetch(`${config.PUBLIC_API_ORIGIN}/api/commerce-sdk-react/category?id=${id}&levels=${2}`);
    const data = await response.json();

    return data.data as unknown as CategoriesProps;
});

export default component$<CategoryMenuPopoverProps>(({category}) => {
    const popoverId = `programmatic-id-${category.name}`;
    const anchorRef = useSignal<HTMLElement | undefined>();
    const {showPopover, hidePopover} = usePopover(popoverId);
    const categories = useSignal<CategoriesProps>();
    const MAXIMUM_NUMBER_COLUMNS = 5;

    useTask$(async () => {
        categories.value = await getCategories(category.id)
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

    const categoriesData = categories.value?.categories?.map((item: CommerceSDK.Category) => {
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

    const columnLength = categories.value?.categories?.length || 2
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
