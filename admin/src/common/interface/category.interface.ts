import { EntityStatus } from './common.interface';

export interface Category {
        categoryId: string;
        name: string;
        createDate: string;
        status: EntityStatus;
}

export interface Subcategory {
        subCategoryId: string;
        name: string;
        status: EntityStatus;
        createDate: string;
        category: Category;
}
