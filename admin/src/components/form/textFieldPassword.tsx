import { Form, Input } from "antd";
import { Control, Controller } from "react-hook-form";
import * as React from "react";

export interface TextFieldPasswordProps {
        error: string;
        field: string;
        label: string;
        control: Control<any>;
}

const TextFieldPassword: React.FC<TextFieldPasswordProps> = ({ control, error, field, label }) => {
        return (
                <Form.Item label={label} name={field} className="w-full">
                        <Controller name={field} defaultValue="" control={control} render={({ field }) => <Input.Password {...field} />} />
                        {Boolean(error.length) && (
                                <p className="text-red-500 ">
                                        {label} {error}
                                </p>
                        )}
                </Form.Item>
        );
};

export default TextFieldPassword;
