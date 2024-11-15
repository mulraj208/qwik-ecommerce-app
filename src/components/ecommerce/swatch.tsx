import {component$} from '@builder.io/qwik';
import {Link} from '@builder.io/qwik-city';

interface SwatchProps {
    variationAttributeValue: CommerceSDK.VariationAttributeValue;
    selected: boolean;
}

export const Swatch = component$((props: SwatchProps) => {
    const { variationAttributeValue, selected } = props;
    const { href, name, image, orderable } = variationAttributeValue;

    const swatchStyles = `
        h-14 w-14 rounded-full
        ${image ? 'p-0' : 'p-2'}
        ${orderable ? 'cursor-pointer' : 'cursor-not-allowed'}
        ${image ? 'shadow-none' : 'shadow-lg'}
        ${selected ? 'border border-gray-800' : ''}
        flex justify-center items-center text-black
    `;

    return (
        <Link key={name} class={swatchStyles} aria-label={name} href={href}>
            {image ? (
                <img
                    alt={image.alt || ''}
                    height={36}
                    width={36}
                    src={image.disBaseLink || image.link}
                    class="rounded-full h-9 w-9"
                />
            ) : (
                <span>{name}</span>
            )}
        </Link>
    );
});

export default Swatch;
