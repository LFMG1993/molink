import React from "react";

export interface Category2 {
    id: string;
    name: string;
    icon: React.ElementType;
}

export interface Category {
    id: string;
    name: string;
    description?: string | null;
    parentId?: string | null;
    imageUrl: string | null;
    createdAt?: string;
    updatedAt?: string;
    children?: Category[];
}

export type CategoryCreationData = Omit<Category, 'id' | 'children'>;
export type CategoryUpdateData = Partial<CategoryCreationData>;