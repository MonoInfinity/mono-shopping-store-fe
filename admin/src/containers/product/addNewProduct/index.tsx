import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import productApi from '../../../api/product';
import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { useUploadFile } from '../../../common/hooks/useUploadFile';
import { ApiState } from '../../../common/interface/api.interface';
import { AddNewProductDto } from '../../../common/interface/dto/product.dto';
import { OptionItem } from '../../../components/form/formSelect';
import { RootState } from '../../../store';
import AddNewProductPresentation from './presentation';

export interface AddNewProductContainerProps {}

const defaultValues: AddNewProductDto = {
        description: '',
        expireDate: '',
        imageUrl: '',
        location: '',
        categoryId: '',
        name: '',
        quantity: '',
        retailPrice: '',
        subcategoryId: '',
        wholesalePrice: '',
};

const AddNewProductContainer: React.FC<AddNewProductContainerProps> = () => {
        const translate = useTranslate();
        const [file, handleOnChangeFile] = useUploadFile();
        const { control, handleSubmit, watch } = useForm({ defaultValues });
        const errors = useFormError<AddNewProductDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const [categoryOptions, setCategoryOptions] = React.useState<OptionItem[]>([]);
        const [subcategoryOptions, setSubcategoryOptions] = React.useState<OptionItem[]>([]);
        const categoryWatcher = watch('categoryId');
        const onSubmit = (data: AddNewProductDto) => {
                console.log(data);
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
