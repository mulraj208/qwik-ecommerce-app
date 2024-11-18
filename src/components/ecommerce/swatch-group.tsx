import {$, component$, useSignal} from '@builder.io/qwik';
import Swatch from "~/components/ecommerce/swatch";

type SwatchGroupProps = {
    name?: string;
    values: CommerceSDK.VariationAttributeValue[];
    selectedValue: CommerceSDK.VariationAttributeValue;
};

export const SwatchGroup = component$((props: SwatchGroupProps) => {
    const {name, values, selectedValue} = props;
    const defaultValue = selectedValue.value || '';
    const selectedValueSignal = useSignal(defaultValue);

    // const handleSelect = (value: string) => {
    //     selectedValueSignal.value = value;
    // };

    console.log('asdfsdf')

    return (
        <div class="flex flex-col gap-2">
            <div class="flex items-center max-w-lg">
                <span class="font-semibold text-lg">
                    {name}
                    {selectedValue.name ? `: ${selectedValue.name}` : ''}
                </span>
            </div>

            <div class="flex items-stretch gap-2">
                {values.map((variationAttributeValue) => (
                    <Swatch
                        key={variationAttributeValue.name}
                        variationAttributeValue={variationAttributeValue}
                        // @ts-ignore
                        onClick$={$((value: string) => {
                            selectedValueSignal.value = value;
                        })}
                        selected={selectedValueSignal.value === variationAttributeValue.value}
                    />
                ))}
            </div>
        </div>
    );
});

export default SwatchGroup;
