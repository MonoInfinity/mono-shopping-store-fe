import { Form, InputNumber } from 'antd';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

export interface TextNumberProps {
        error: string;
        field: string;
        label: string;
        control: Control<any>;
        unit: string;
}

const TextNumber: React.FC<TextNumberProps> = ({ control, error, field, label, unit }) => {
        return (
                <>
                        <Form.Item label={label} name={field} className="w-full">
                                <Controller
                                        name="salary"
                                        control={control}
                                        render={({ field }) => (
                                                <InputNumber
                                                        formatter={(value) => `${unit}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        {...field}
                                                />
                                        )}
                                />
                                {Boolean(error.length) && (
                                        <p className="text-red-500 ">
                                                {label} {error}
                                        </p>
                                )}
                        </Form.Item>
                </>
        );
};

export default TextNumber;
