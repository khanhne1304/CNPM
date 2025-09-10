import React, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger";
    className?: string;
    type?: "button" | "submit" | "reset";
};
declare const Button: React.FC<ButtonProps>;

type InputTextProps = {
    value: string | number;
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
    type?: "text" | "number";
    min?: number;
    max?: number;
};
declare const InputText: React.FC<InputTextProps>;

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
};
declare const Modal: React.FC<ModalProps>;

type CardProps = {
    title?: string;
    children: ReactNode;
    className?: string;
};
declare const Card: React.FC<CardProps>;

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    sku?: string;
    meta?: Record<string, unknown>;
};
type CartState = {
    items: CartItem[];
};
type CartAction = {
    type: "ADD";
    item: CartItem;
} | {
    type: "REMOVE";
    id: string;
} | {
    type: "UPDATE";
    id: string;
    quantity: number;
} | {
    type: "CLEAR";
};

type CartContextValue = {
    state: CartState;
    add: (item: CartItem) => void;
    remove: (id: string) => void;
    update: (id: string, quantity: number) => void;
    clear: () => void;
    totalItems: number;
    subtotal: number;
};
declare function CartProvider({ children, persistKey, }: {
    children: ReactNode;
    persistKey?: string;
}): react_jsx_runtime.JSX.Element;
declare function useCart(): CartContextValue;

declare function CartPanel(): react_jsx_runtime.JSX.Element;
declare function CartModalButton(): react_jsx_runtime.JSX.Element;
declare function AddToCartButton({ id, name, price, image }: {
    id: string;
    name: string;
    price: number;
    image?: string;
}): react_jsx_runtime.JSX.Element;

export { AddToCartButton, Button, Card, type CartAction, type CartItem, CartModalButton, CartPanel, CartProvider, type CartState, InputText, Modal, useCart };
