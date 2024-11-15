import {component$, useSignal} from '@builder.io/qwik';

type DisplayPriceProps = {
    basePrice?: string | number;
    discountPrice?: number | null;
    isProductASet?: boolean;
    productCurrency?: string;
};

export const DisplayPrice = component$((props: DisplayPriceProps) => {
    const {basePrice = 0, discountPrice, isProductASet = false} = props;
    const isLoading = useSignal(false);

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {isLoading.value ? (
                <div class="skeleton" style={{width: '100px', height: '20px'}}></div>
            ) : (
                <>
                    {isProductASet && (
                        <span style={{fontSize: 'md', fontWeight: 'bold', marginRight: '4px'}}>
                          Starting at{' '}
                        </span>
                    )}

                    {typeof discountPrice === 'number' && (
                        <span style={{fontWeight: 'bold', marginRight: '4px'}}>
                          ${discountPrice.toFixed(2)}
                        </span>
                    )}

                    <span
                        style={{
                            fontSize: 'lg',
                            fontWeight: discountPrice ? 'normal' : 'bold',
                            marginLeft: discountPrice ? '8px' : '0',
                        }}
                    >
                        ${Number(basePrice).toFixed(2)}
                      </span>
                </>
            )}
        </div>
    );
});

export default DisplayPrice;
