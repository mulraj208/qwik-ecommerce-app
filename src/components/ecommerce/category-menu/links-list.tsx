import { component$ } from '@builder.io/qwik';
import type { QwikIntrinsicElements } from '@builder.io/qwik';
import {Link} from "@builder.io/qwik-city";
import {LinkListItem} from "~/components/ecommerce/category-menu/links-list-item";

export const LINK_LIST_VARIANTS = {
    vertical: 'vertical',
    horizontal: 'horizontal',
} as const;

export type LinkListVariant = keyof typeof LINK_LIST_VARIANTS;

export type Link = {
    href?: string;
    text?: string;
    styles?: Record<string, string | number>;
};

type LinkListProps = QwikIntrinsicElements['div'] & {
    links: Link[];
    heading?: { href?: string; text?: string; styles?: string };
    variant?: LinkListVariant;
    onLinkClick$?: () => void;
};

export const LinksList = component$((props: LinkListProps) => {
    const { links = [], heading, variant, ...rest } = props;

    return (
        <div {...rest}>
            {heading ? (
                heading.href ? (
                    <Link aria-label={heading.text} href={heading.href} class="inline-flex">
                        <h2 class={`py-3 ${heading.styles ? heading.styles : ''}`}>
                            {heading.text}
                        </h2>
                    </Link>
                ) : (
                    <h2 class={`${heading.styles ? heading.styles : ''}`}>
                        {heading.text}
                    </h2>
                )
            ) : null}

            {links.length > 0 ? (
                <ul
                    class={`list-none p-0 ${variant === LINK_LIST_VARIANTS.horizontal ? 'flex gap-3 flex-row' : ' space-y-3'} ${
                        variant === LINK_LIST_VARIANTS.vertical ? 'flex flex-col' : ''
                    }`}
                >
                    {links.map((link, i) => (
                        <LinkListItem key={i} link={link} />
                    ))}
                </ul>
            ) : null}
        </div>
    );
});

export default LinksList;
