import { component$ } from '@builder.io/qwik';
import type { Link } from './links-list';

type LinkListItemProps = {
    link: Link;
};

export const LinkListItem = component$((props: LinkListItemProps) => {
    const { link } = props;

    return (
        <li class="list-none">
            <a href={link.href} class="text-black text-md">
                {link.text}
            </a>
        </li>
    );
});
