import { AxiosInstance } from 'axios';
import { ServerResponse } from '../common/interface/api.interface';
import { Category, Subcategory } from '../common/interface/category.interface';
import http from './axiosCommon';

export class ProductApi {
        constructor(private readonly apiCall: AxiosInstance, private readonly prefix: string) {}

        public async getAllCategory() {
                const url = `${this.prefix}/category/all`;
                const res = await this.apiCall.get<ServerResponse<Category[]>>(url);
                return res;
        }
        public async getSubcategoryByCategoryId(id: string) {
                const url = `${this.prefix}/subcategory/category?categoryId=${id}`;
                const res = await this.apiCall.get<ServerResponse<Subcategory[]>>(url);
                return res;
        }
}

export const productApi = new ProductApi(http, '/product');
export default productApi;
