import {useTranslation} from "react-i18next";
import {Menu, MenuButton, MenuItems, MenuItem} from "@headlessui/react";
import {Translate} from 'react-bootstrap-icons'

interface LanguageSelectorProps {
    isTransparent: boolean;
}

export default function LanguageSelector({isTransparent}: LanguageSelectorProps) {
    const {i18n} = useTranslation();
    const currentLanguage = i18n.language.toUpperCase();
    const buttonClasses = `flex items-center p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'}`;

    return (
        <Menu as="div" className="relative">
            <MenuButton className={buttonClasses}>
                <Translate className="h-6 w-6"/>
                <span className="ml-1 text-xs font-bold">{currentLanguage}</span>
            </MenuButton>

            <MenuItems
                anchor="bottom end"
                transition
                className="z-60 w-32 divide-y divide-(--color-border) rounded-md bg-(--color-card) text-(--color-foreground) shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right transition ease-out data-closed:opacity-0 data-closed:scale-95 data-enter:duration-100 data-leave:duration-75"
            >
                <div className="px-1 py-1">
                    <MenuItem>
                        {({focus}) => (
                            <button
                                onClick={() => i18n.changeLanguage('es')}
                                className={`${focus ? 'bg-primary text-primary-foreground' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Español (ES)
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({focus}) => (
                            <button
                                onClick={() => i18n.changeLanguage('en')}
                                className={`${focus ? 'bg-primary text-primary-foreground' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                English (EN)
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}