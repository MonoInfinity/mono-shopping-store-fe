import { Form, Input } from 'antd';
import { Control, Controller } from 'react-hook-form';
import * as React from 'react';

export interface TextFieldProps {
        error: string;
        field: string;
        label: string;
        control: Control<any>;
        className?: string;
}

const TextField: React.FC<TextFieldProps> = ({ control, error, field, label, className = '' }) => {
        return (
                <Form.Item label={label} className={`flex-1 w-full ${className}`}>
                        <Controller
                                name={field}
                                control={control}
                                render={({ field }) => <Input {...field} className="" />}
                        />
                        {Boolean(error.length) && (
                                <p className="text-red-500">
                                        {label} {error}
                                </p>
                        )}
                </Form.Item>
        );
};

export default TextField;
