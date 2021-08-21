import { Button, Spin } from "antd";
import { Form } from "antd";
import * as React from "react";

export interface FormBtnProps {
        isLoading: boolean;
        label: string;
}

const FormBtn: React.FC<FormBtnProps> = ({ isLoading, label }) => {
        return (
                <Form.Item name={label}>
                        {isLoading && (
                                <div className="text-center ">
                                        <Spin size="large" />
                                </div>
                        )}
                        {!isLoading && (
                                <Button type="primary" htmlType="submit" className="w-full">
                                        {label}
                                </Button>
                        )}
                </Form.Item>
        );
};

export default FormBtn;
