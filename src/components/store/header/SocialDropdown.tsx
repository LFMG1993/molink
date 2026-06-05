import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Share2 } from 'lucide-react';

interface SocialSelectorProps {
    isTransparent: boolean;
}

export default function SocialSelector({ isTransparent }: SocialSelectorProps) {
    const buttonClasses = `flex items-center p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'}`;

    return (
        <Menu as="div" className="relative">
            <Menu.Button
                className={buttonClasses}>
                <Share2 className="h-6 w-6" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >

            </Transition>
        </Menu>
    );
};