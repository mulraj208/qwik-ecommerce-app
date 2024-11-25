import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { Image } from "@unpic/qwik";
import { findImageGroupBy } from '~/utils/image-groups-utils';

type ImageGalleryProps = {
    imageGroups: Array<CommerceSDK.ImageGroup>;
    selectedVariationAttributes: Array<string>;
    isLazy?: boolean;
    product: CommerceSDK.Product$0;
};

const ImageViewType = {
    LARGE: 'large',
    SMALL: 'small',
};

export const ImageGallery = component$((props: ImageGalleryProps) => {
    const { imageGroups, selectedVariationAttributes = {}, isLazy = false, product } = props;

    const store = useStore({
        selectedIndex: 0,
        heroImageGroup: null as CommerceSDK.ImageGroup | null,
        thumbnailImageGroup: null as CommerceSDK.ImageGroup | null,
    });

    // Replace useMemo with Qwik's useTask$ to calculate values reactively
    useTask$(() => {
        // @ts-ignore
        store.heroImageGroup = findImageGroupBy(imageGroups, {
            viewType: ImageViewType.LARGE,
            selectedVariationAttributes,
        });

        // @ts-ignore
        store.thumbnailImageGroup = findImageGroupBy(imageGroups, {
            viewType: ImageViewType.SMALL,
            selectedVariationAttributes,
        });
    });

    const heroImage = store.heroImageGroup?.images[store.selectedIndex];
    const thumbnailImages = store.thumbnailImageGroup?.images || [];
    const loadingStrategy = isLazy ? 'lazy' : 'eager';

    return (
        <div class="flex flex-col">
            {heroImage && (
                <div class="mb-2">
                    <div class="aspect-square relative overflow-hidden">
                        <Image
                            src={heroImage.disBaseLink || heroImage.link}
                            alt={heroImage.alt || product.name || 'Image'}
                            width={480}
                            height={480}
                            priority={true}
                            class="object-cover w-full max-w-full"
                        />
                    </div>
                </div>
            )}

            <ul class="flex flex-wrap list-none gap-2 p-0">
                {thumbnailImages.map((image, index) => {
                    const selected = index === store.selectedIndex;
                    return (
                        <li key={index} class="w-24 h-24">
                            <button
                                aria-pressed={selected ? 'true' : 'false'}
                                class={`w-full h-full rounded-lg bg-transparent p-1 ${selected ? 'border border-black' : ''}`}
                                onClick$={() => (store.selectedIndex = index)}
                                onKeyUp$={(e) => {
                                    if (e.key === 'Enter') store.selectedIndex = index;
                                }}
                            >
                                <img
                                    src={image.disBaseLink || image.link}
                                    alt={image.alt || ''}
                                    loading={loadingStrategy}
                                    width={94}
                                    height={94}
                                    class="object-cover aspect-square"
                                />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});
