import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import commonAPI from '../../../api/commonApi';
import productApi from '../../../api/productApi';
import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { useUploadFile } from '../../../common/hooks/useUploadFile';
import { ApiState } from '../../../common/interface/api.interface';
import { AddNewProductForm } from '../../../common/interface/dto/product.dto';
import { OptionItem } from '../../../components/form/formSelect';
import { RootState } from '../../../store';
import AddNewProductPresentation from './presentation';

export interface AddNewProductContainerProps {}

const defaultValues: AddNewProductForm = {
        description: '',
        imageUrl: '',
        location: '',
        categoryId: '',
        name: '',
        quantity: '',
        retailPrice: '',
        subCategoryId: '',
        wholesalePrice: '',
};

const AddNewProductContainer: React.FC<AddNewProductContainerProps> = () => {
        const translate = useTranslate();
        const { control, handleSubmit, watch } = useForm({ defaultValues });
        const errors = useFormError<AddNewProductForm>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const categoryWatcher = watch('categoryId');

        const [file, handleOnChangeFile] = useUploadFile();
        const [categoryOptions, setCategoryOptions] = React.useState<OptionItem[]>([]);
        const [subcategoryOptions, setSubcategoryOptions] = React.useState<OptionItem[]>([]);

        const onSubmit = (data: AddNewProductForm) => {
                if (file)
                        commonAPI.uploadFile(file).then(({ data: { data: imageUrl } }) => {
                                productApi.addNewProduct({
                                        description: data.description,
                                        imageUrl: imageUrl,
                                        name: data.name,
                                        quantity: Number(data.quantity),
                                        location: data.location,
                                        retailPrice: Number(data.retailPrice),
                                        subCategoryId: data.subCategoryId,
                                        wholesalePrice: Number(data.wholesalePrice),
                                });
                        });
        };

        React.useEffect(() => {
                if (categoryWatcher) {
                        productApi.getSubcategoryByCategoryId(categoryWatcher).then((res) => {
                                const formatOptions: OptionItem[] = res.data.data.map((item) => {
                                        return { value: item.subCategoryId, label: item.name };
                                });

                                setSubcategoryOptions(formatOptions);
                        });
                }
        }, [categoryWatcher]);

        React.useEffect(() => {
                productApi.getAllCategory().then((res) => {
                        const formatOptions: OptionItem[] = res.data.data.map((item) => {
                                return { value: item.categoryId, label: item.name };
                        });
                        setCategoryOptions(formatOptions);
                });
        }, []);

        return (
                <AddNewProductPresentation
                        translate={translate}
                        apiState={apiState}
                        control={control}
                        errors={errors}
                        file={file}
                        categoryOptions={categoryOptions}
                        handOnChangeFile={handleOnChangeFile}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        subcategoryOptions={subcategoryOptions}
                />
        );
};

export default AddNewProductContainer;
