import { component$ } from '@builder.io/qwik';
import type { Link } from './links-list';

type LinkListItemProps = {
    link: Link;
    onLinkClick?: () => void;
};

export const LinkListItem = component$((props: LinkListItemProps) => {
    const { link, onLinkClick: handleLinkClick } = props;

    return (
        <li class="list-none">
            <a
                href={link.href}
                onClick$={handleLinkClick}
                class="text-black text-md"
            >
                {link.text}
            </a>
        </li>
    );
});
