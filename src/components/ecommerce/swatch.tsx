import {$, component$} from '@builder.io/qwik';
import {useNavigate} from '@builder.io/qwik-city';

interface SwatchProps {
    variationAttributeValue: CommerceSDK.VariationAttributeValue;
}

export const Swatch = component$((props: SwatchProps) => {
    const { variationAttributeValue } = props;
    const { href, name, image, orderable } = variationAttributeValue;
    const navigate = useNavigate();

    const handleOnChange = $(() => {
        navigate(href);
    });

    const swatchStyles = `
        h-14 w-14 rounded-full
        ${image ? 'p-0' : 'p-2'}
        ${orderable ? 'cursor-pointer' : 'cursor-not-allowed'}
        ${image ? 'shadow-none' : 'shadow-lg'}
        flex justify-center items-center
    `;

    return (
        <div
            class={swatchStyles}
            key={name}
            onClick$={handleOnChange}
            aria-label={name}
        >
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
        </div>
    );
});

export default Swatch;
