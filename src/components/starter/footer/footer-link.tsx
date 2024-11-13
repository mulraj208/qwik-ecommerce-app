import { component$ } from '@builder.io/qwik';
import {LinksList} from "~/components/ecommerce/category-menu/links-list";
import type {LinkListVariant} from "~/components/ecommerce/category-menu/links-list";

type FooterLinksProps = {
    linkListVariant?: LinkListVariant;
};

export const CustomerSupportLinks = component$(() => {
    const heading = {
        text: 'Customer Support',
        styles: 'text-xl mb-6'
    };
    const links = [
        {
            href: '/',
            text: 'Contact Us',
        },
        {
            href: '/',
            text: 'Shipping',
        },
    ];

    return <LinksList heading={heading} links={links} variant="vertical" />;
});

export const AccountLinks = component$(() => {
    const heading = {
        text: 'Account',
        styles: 'text-xl mb-6'
    };
    const links = [
        {
            href: '/',
            text: 'Order Status',
        },
        {
            href: '/',
            text: 'Sign in or create account',
        },
    ];

    return <LinksList heading={heading} links={links} variant="vertical" />;
});

export const CompanyLinks = component$(() => {
    const heading = {
        text: 'Our Company',
        styles: 'text-xl mb-6'
    };
    const links = [
        {
            href: '/',
            text: 'Store Locator',
        },
        {
            href: '/',
            text: 'About Us',
        },
    ];

    return <LinksList heading={heading} links={links} variant="vertical" />;
});

export const LegalLinks = component$((props: FooterLinksProps) => {
    const { linkListVariant } = props;
    const links = [
        {
            href: '/',
            text: 'Terms & Conditions',
        },
        {
            href: '/',
            text: 'Privacy Policy',
        },
        {
            href: '/',
            text: 'Site Map',
        },
    ];

    return <LinksList links={links} variant={linkListVariant} />;
});
