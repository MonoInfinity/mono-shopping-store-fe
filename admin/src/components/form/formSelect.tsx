import { Form, Select } from 'antd';

import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { convertRoleToString } from '../../common/helper/userHelper';

import { useTranslate } from '../../common/hooks/useTranslate';
import { LocaleKey } from '../../common/interface/locale.interface';
import { UserRole } from '../../common/interface/user.interface';

export interface OptionItem {
        value: any;
        label: LocaleKey | string;
}

export interface FormSelectProps {
        field: string;
        control: Control<any>;
        className?: string;
        optionItem: OptionItem[];
        label?: string;
        error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ control, field, className, optionItem, error = '', label }) => {
        const translate = useTranslate();

        return (
                <>
                        <Form.Item className={`flex-1 w-full ${className}`} label={label}>
                                <Controller
                                        name={field}
                                        control={control}
                                        render={({ field }) => {
                                                return (
                                                        <Select {...field} className="w-full">
                                                                {optionItem.map((item) => {
                                                                        return (
                                                                                <Select.Option
                                                                                        key={item.label}
                                                                                        value={item.value}
                                                                                        className="capitalize"
                                                                                >
                                                                                        {translate(item.label)}
                                                                                </Select.Option>
                                                                        );
                                                                })}
                                                        </Select>
                                                );
                                        }}
                                />
                                {Boolean(error.length) && (
                                        <p className="text-red-500">
                                                {label} {error}
                                        </p>
                                )}
                        </Form.Item>
                </>
        );
};

export default FormSelect;
