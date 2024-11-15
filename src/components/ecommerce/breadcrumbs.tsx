import {component$, Resource, Slot, useResource$} from '@builder.io/qwik';
import {categoryUrlBuilder} from '~/utils/urls';
import {LuChevronRight} from "@qwikest/icons/lucide";
import {Link} from "@builder.io/qwik-city";
import {SkeletonText} from "~/components/ecommerce/skeleton-text";
import {getApiClients} from "~/utils/commerce-api";

export const BreadcrumbRoot = component$(() => {
    return (
        <nav class="flex items-center space-x-2">
            <Slot/>
        </nav>
    );
});

interface BreadcrumbLinkProps {
    href: string;
    text: string | undefined;
}

export const BreadcrumbLink = component$(({href, text}: BreadcrumbLinkProps) => {
    return (
        <Link href={href} class="text-sm font-medium text-gray-900 hover:text-blue-600">
            {text}
        </Link>
    );
});

type BreadcrumbProps = {
    product?: CommerceSDK.Product$0;
};

export const Breadcrumbs = component$((props: BreadcrumbProps) => {
    const {product} = props;

    const categoriesResource = useResource$<CommerceSDK.Category | null>(async ({track}) => {
        track(() => product?.primaryCategoryId);

        if (!product?.primaryCategoryId) return null;

        const {shopperProducts} = await getApiClients();

        return await shopperProducts.getCategory({
            parameters: {id: product.primaryCategoryId, levels: 1}
        });
    });

    return (
        <Resource
            value={categoriesResource}
            onPending={() => <SkeletonText classes="4" width="200px"/>}
            onRejected={() => <div>Error loading categories</div>}
            onResolved={(categories) => (
                <BreadcrumbRoot>
                    {categories?.parentCategoryTree?.map((category, index) => (
                        <>
                            <BreadcrumbLink
                                key={category.id}
                                href={categoryUrlBuilder(category as CommerceSDK.Category)}
                                text={category.name}
                            />
                            {categories.parentCategoryTree?.length !== index ?
                                <LuChevronRight class="text-gray-400"/> : null}

                        </>
                    ))}
                </BreadcrumbRoot>
            )}
        />
    );
});

export default Breadcrumbs;
