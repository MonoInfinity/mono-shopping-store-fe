import { Col, Form, Row } from 'antd';

import * as React from 'react';
import { Control } from 'react-hook-form';

import { ApiState } from '../../../common/interface/api.interface';
import { AddNewProductForm } from '../../../common/interface/dto/product.dto';
import { LocaleKey } from '../../../common/interface/locale.interface';
import { FormBtn, FormMsg, TextField, TextNumber } from '../../../components/form';
import FormSelect, { OptionItem } from '../../../components/form/formSelect';
import FormTextarea from '../../../components/form/formTextarea';
import FormUpload from '../../../components/form/formUpload';

export interface AddNewProductPresentationProps {
        apiState: ApiState;
        errors: AddNewProductForm;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        control: Control<AddNewProductForm>;
        handOnChangeFile(file: React.ChangeEvent<HTMLInputElement>): void;
        translate(key: LocaleKey, context?: any): string;
        file: File | undefined;
        categoryOptions: OptionItem[];

        subcategoryOptions: OptionItem[];
}

const AddNewProductPresentation: React.FC<AddNewProductPresentationProps> = ({
        translate,
        file,
        apiState,
        control,
        errors,
        handOnChangeFile,
        handleOnSubmit,
        categoryOptions,
        subcategoryOptions,
}) => {
        const FormBody = (
                <Form layout="vertical" onFinish={handleOnSubmit}>
                        <h1 className="pb-4 text-3xl font-semibold">{translate('title-addNewProduct')}</h1>

                        <FormUpload
                                defaultImage="/images/default-product.jpg"
                                field="avatar"
                                file={file}
                                handleOnChangeFile={handOnChangeFile}
                        />

                        <FormMsg
                                isError={apiState.isError}
                                errorMessage={apiState.errorMessage}
                                message={apiState.message}
                                isLoading={apiState.isLoading}
                        />
                        <Row>
                                <Col span={11}>
                                        <TextField
                                                control={control}
                                                error={errors.name}
                                                field="name"
                                                label={translate('field-name')}
                                        />
                                </Col>
                                <Col span={11} offset={2}>
                                        <TextField
                                                control={control}
                                                error={errors.location}
                                                field="location"
                                                label={translate('field-location')}
                                        />
                                </Col>
                        </Row>

                        <Row>
                                <Col span={11}>
                                        <TextNumber
                                                control={control}
                                                error={errors.wholesalePrice}
                                                field="wholesalePrice"
                                                label={translate('field-wholesalePrice')}
                                                unit="$ "
                                        />
                                </Col>
                                <Col span={11} offset={2}>
                                        <TextNumber
                                                control={control}
                                                error={errors.retailPrice}
                                                field="retailPrice"
                                                label={translate('field-retailPrice')}
                                                unit="$ "
                                        />
                                </Col>
                        </Row>

                        <Row>
                                <Col span={11}>
                                        <FormSelect
                                                control={control}
                                                field="categoryId"
                                                label={translate('field-category')}
                                                optionItem={categoryOptions}
                                        />
                                </Col>
                                <Col span={11} offset={2}>
                                        <FormSelect
                                                control={control}
                                                field="subCategoryId"
                                                label={translate('field-subcategory')}
                                                optionItem={subcategoryOptions}
                                        />
                                </Col>
                        </Row>
                        <TextNumber
                                control={control}
                                error={errors.quantity}
                                field="quantity"
                                label={translate('field-quantity')}
                                unit=""
                        />
                        <FormTextarea
                                control={control}
                                error={errors.quantity}
                                field="description"
                                label={translate('field-description')}
                        />

                        <FormBtn isLoading={apiState.isLoading} label={translate('button-addNewProduct')} />
                </Form>
        );

        return (
                <div className="space-y-4">
                        <div className="max-w-xl px-2 py-4 space-y-8 border fade-in">{FormBody}</div>
                </div>
        );
};

export default AddNewProductPresentation;
