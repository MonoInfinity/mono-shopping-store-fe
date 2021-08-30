export interface AddNewProductDto {
        name: string;
        description: string;
        location: string;
        wholesalePrice: number;
        retailPrice: number;
        quantity: number;
        subCategoryId: string;
        imageUrl: string;
}

export interface AddNewProductForm {
        categoryId: string;
        name: string;
        description: string;
        location: string;
        wholesalePrice: string;
        retailPrice: string;
        quantity: string;
        subCategoryId: string;
        imageUrl: string;
}
