import { component$, QwikIntrinsicElements } from '@builder.io/qwik';
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
    const { links = [], heading, variant, onLinkClick$, ...rest } = props;

    return (
        <div {...rest}>
            {heading ? (
                heading.href ? (
                    <a
                        aria-label={heading.text}
                        href={heading.href}
                        onClick$={onLinkClick$}
                        class="inline-flex"
                    >
                        <h2 class={`py-3 ${heading.styles ? heading.styles : ''}`}>
                            {heading.text}
                        </h2>
                    </a>
                ) : (
                    <h2 class={`${heading.styles ? heading.styles : ''}`}>
                        {heading.text}
                    </h2>
                )
            ) : null}

            {links.length > 0 ? (
                <ul
                    class={`list-none p-0 space-y-3 ${variant === LINK_LIST_VARIANTS.horizontal ? 'flex gap-3 flex-row' : ''} ${
                        variant === LINK_LIST_VARIANTS.vertical ? 'flex flex-col' : ''
                    }`}
                >
                    {links.map((link, i) => (
                        <LinkListItem key={i} link={link} onLinkClick$={onLinkClick$} />
                    ))}
                </ul>
            ) : null}
        </div>
    );
});

export default LinksList;
