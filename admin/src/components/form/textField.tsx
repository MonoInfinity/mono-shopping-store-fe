import { Form, Input } from "antd";
import { Control, Controller } from "react-hook-form";
import * as React from "react";

export interface TextFieldProps {
        error: string;
        field: string;
        label: string;
        control: Control<any>;
}

const TextField: React.FC<TextFieldProps> = ({ control, error, field, label }) => {
        return (
                <Form.Item label={label} name={field} className="w-full">
                        <Controller name={field} control={control} render={({ field }) => <Input {...field} className="" />} />
                        {Boolean(error.length) && (
                                <p className="text-red-500">
                                        {label} {error}
                                </p>
                        )}
                </Form.Item>
        );
};

export default TextField;
