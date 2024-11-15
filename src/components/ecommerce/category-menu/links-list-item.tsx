import { component$ } from '@builder.io/qwik';
import {Link} from "@builder.io/qwik-city";
import type { Link as LinkType } from './links-list';

type LinkListItemProps = {
    link: LinkType;
};

export const LinkListItem = component$((props: LinkListItemProps) => {
    const { link } = props;

    return (
        <li class="list-none">
            <Link href={link.href} class="text-black text-md">
                {link.text}
            </Link>
        </li>
    );
});
