import { Form, Radio } from 'antd';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslate } from '../../common/hooks/useTranslate';

export interface FormRadioStatusProps {
        field: string;
        control: Control<any>;
}

const FormRadioStatus: React.FC<FormRadioStatusProps> = ({ control, field }) => {
        const translate = useTranslate();

        return (
                <Form.Item className="w-full my-auto">
                        <Controller
                                name={field}
                                control={control}
                                render={({ field }) => {
                                        return (
                                                <Radio.Group {...field}>
                                                        <Radio name="status" value="1">
                                                                {translate('user-status-active')}
                                                        </Radio>
                                                        <Radio name="status" value="0">
                                                                {translate('user-status-inactive')}
                                                        </Radio>
                                                </Radio.Group>
                                        );
                                }}
                        />
                </Form.Item>
        );
};

export default FormRadioStatus;
