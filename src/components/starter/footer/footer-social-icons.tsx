import { component$ } from '@builder.io/qwik';
import { LuExternalLink } from "@qwikest/icons/lucide";

export const SocialIcons = component$(() => {
    return (
        <div class="flex space-x-6 mt-3 lg:mt-0">
            <LuExternalLink class="w-6 h-6 text-gray-300 hover:text-blue-500" />
            <LuExternalLink class="w-6 h-6 text-gray-300 hover:text-blue-500" />
            <LuExternalLink class="w-6 h-6 text-gray-300 hover:text-blue-500" />
            <LuExternalLink class="w-6 h-6 text-gray-300 hover:text-blue-500" />
        </div>
    );
});
