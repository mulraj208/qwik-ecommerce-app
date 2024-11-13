import { component$ } from '@builder.io/qwik';

export const Subscribe = component$(() => {
    return (
        <div class="flex flex-col space-y-4 text-white">
            <h2 class="text-lg font-medium">Be the first to know</h2>
            <p class="text-sm">Sign up to stay in the loop about the hottest deals</p>

            <div class="relative">
                <input
                    aria-label="Email"
                    type="email"
                    placeholder="you@email.com"
                    class="w-full p-4 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div class="absolute right-0 top-0 h-full">
                    <button class="px-6 py-2 h-full text-white border-2 border-white rounded-md hover:bg-white hover:text-black">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
});
