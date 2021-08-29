import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

export interface FormTextareaProps {
        error: string;
        field: string;
        label: string;
        control: Control<any>;
        className?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ control, error, field, label, className = '' }) => {
        return (
                <Form.Item className={`w-full flex-1 ${className}`} label={label}>
                        <Controller
                                name={field}
                                control={control}
                                render={({ field }) => {
                                        return <TextArea {...field} />;
                                }}
                        />
                        {Boolean(error.length) && (
                                <p className="text-red-500 ">
                                        {label} {error}
                                </p>
                        )}
                </Form.Item>
        );
};

export default FormTextarea;
