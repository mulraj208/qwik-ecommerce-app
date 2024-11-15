import { component$ } from '@builder.io/qwik';

interface SkeletonTextProps {
    height?: string;
    width?: string;
    classes?: string;
}

export const SkeletonText = component$(({ height = '4', width = 'full', classes = '' }: SkeletonTextProps) => {
    return (
        <div
            class={['bg-gray-200 rounded-md animate-pulse', classes]}
            style={{
                height: height.endsWith('px') || height.endsWith('%') ? height : `${height}rem`,
                width: width.endsWith('px') || width.endsWith('%') ? width : width === 'full' ? '100%' : `${width}rem`,
            }}
        />
    );
});
