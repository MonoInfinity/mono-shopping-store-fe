import { Form, Image } from 'antd';
import * as React from 'react';

export interface FormUploadProps {
        file: File | undefined;
        handleOnChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
        defaultImage: string;
        field: string;
        className?: string;
}

const FormUpload: React.FC<FormUploadProps> = ({
        file,
        handleOnChangeFile,
        defaultImage,
        field,
        className = 'w-56',
}) => {
        return (
                <Form.Item>
                        <Image
                                preview={false}
                                src={file ? URL.createObjectURL(file) : defaultImage}
                                className={`border ${className}`}
                        ></Image>
                        <input type="file" onChange={handleOnChangeFile} name={field} />
                </Form.Item>
        );
};

export default FormUpload;
