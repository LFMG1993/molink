import {Link} from "react-router-dom";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";
import {useCart} from "../../../context/store/CardContext.tsx";
import {Cart, Trash3Fill, FileImage} from "react-bootstrap-icons";

interface CartDropdownProps {
    isTransparent: boolean;
    isPanel?: boolean;
}

export default function CartDropdown({isTransparent, isPanel = false}: CartDropdownProps) {
    const {items, removeItem, isShaking} = useCart();
    const uniqueItemsCount = items.length;
    const buttonClasses = `relative p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/20' : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'} ${isShaking ? 'shake' : ''}`;

    const CartContent = (
        <div className="p-4">
            {items.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-(--color-foreground)/60">Tu carrito está vacío.</p>
                </div>
            ) : (
                <>
                    <ul className="max-h-[calc(100vh-250px)] overflow-y-auto divide-y divide-(--color-border) -mx-4 px-4">
                        {items.map(item => (
                            <li key={item.variantId} className="flex items-center py-4">
                                <div
                                    className="h-16 w-16 bg-(--color-muted) border border-(--color-border) rounded-md shrink-0 flex items-center justify-center">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name}
                                             className="h-full w-full object-cover rounded-md"/>
                                    ) : (
                                        <FileImage className="h-8 w-8 text-(--color-muted-foreground)/60"/>
                                    )}
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-(--color-foreground)/60">{item.variantDescription} {item.unitOfMeasure ? `(${item.unitOfMeasure})` : ''}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-(--color-foreground)/80 text-sm">Cant: {item.quantity}</p>
                                        {/*  Lógica de precios dinámicos en el dropdown. */}
                                        <div className="text-sm font-medium">
                                            {(() => {
                                                const applicableDiscount = item.volumeDiscounts
                                                    ?.sort((a, b) => b.minQuantity - a.minQuantity)
                                                    .find(d => item.quantity >= d.minQuantity);
                                                const effectivePrice = applicableDiscount ? applicableDiscount.price : item.price;

                                                return effectivePrice < item.price ? (
                                                    <span
                                                        className="text-green-600">${effectivePrice.toLocaleString('es-CO')}</span>
                                                ) : <span>${item.price.toLocaleString('es-CO')}</span>
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item.variantId)}
                                        className="ml-4 p-1 text-(--color-foreground)/50 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                        aria-label={`Eliminar ${item.name} del carrito`}>
                                    <Trash3Fill className="h-5 w-5"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 border-t border-(--color-border) pt-4">
                        <Link to="/cart"
                              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white background-lider hover:bg-liderplast-hover">
                            Ir al Carrito
                        </Link>
                    </div>
                </>
            )}
        </div>
    );

    if (isPanel) return CartContent;

    return (
        <Menu as="div" className="relative">
            <MenuButton className={buttonClasses}>
                <span className="sr-only">Ver carrito</span>
                <Cart className="w-6 h-6"/>
                {uniqueItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {uniqueItemsCount}
                    </span>
                )}
            </MenuButton>

            <MenuItems
                anchor="bottom end"
                transition
                className="z-60 w-80 bg-(--color-card) text-(--color-foreground) rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right transition ease-out data-closed:opacity-0 data-closed:scale-95 data-enter:duration-100 data-leave:duration-75"
            >
                {CartContent}
            </MenuItems>
        </Menu>
    );
}