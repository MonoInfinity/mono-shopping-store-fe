import { Form, InputNumber } from 'antd';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

export interface TextNumberProps {
        error: string;
        field: string;
        label: string;
        control: Control<any>;
        unit: string;
        className?: string;
}

const TextNumber: React.FC<TextNumberProps> = ({ control, error, field, label, unit, className }) => {
        return (
                <Form.Item label={label} className={`flex-1 w-full ${className}`}>
                        <Controller
                                name={field}
                                control={control}
                                render={({ field }) => (
                                        <InputNumber
                                                className="w-full "
                                                formatter={(value) =>
                                                        `${unit}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                }
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
        );
};

export default TextNumber;
