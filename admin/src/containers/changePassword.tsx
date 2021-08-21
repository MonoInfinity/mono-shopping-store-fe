import * as React from "react";
import { Link } from "react-router-dom";
import routers from "../common/constants/router";
import TextFieldPassword from "../components/form/textFieldPassword";
import { ChangePasswordDto } from "../common/interface/dto/user.dto";
import { useForm } from "react-hook-form";
import { RootState } from "../store";
import { ApiState } from "../common/interface/api.interface";
import useFormError from "../common/hooks/userFormError";
import { useSelector } from "react-redux";
import { Form, Button, Steps } from "antd";
import FormBtn from "../components/form/formBtn";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";

export interface ChangePasswordProps {}

const defaultValues: ChangePasswordDto = {
        confirmPassword: "",
        currentPassword: "",
        newPassword: "",
};

const ChangePassword: React.FC<ChangePasswordProps> = () => {
        const { handleSubmit, control } = useForm<ChangePasswordDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<ChangePasswordDto>(defaultValues);

        const onSubmit = (data: ChangePasswordDto) => {};

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="space-y-4">
                                <button className="font-semibold ">
                                        <Link to={routers.viewProfile.link}>Go Back</Link>
                                </button>

                                <div className="">
                                        <div className="px-2 py-4 space-y-8 border w-96 fade-in">
                                                <h1 className="text-4xl font-semibold text-center">Update Password</h1>
                                                <Form className="" name="basic" layout="vertical" onFinish={handleSubmit(onSubmit)}>
                                                        <TextFieldPassword
                                                                control={control}
                                                                error={errors.currentPassword}
                                                                field="currentPassword"
                                                                label="Current Password"
                                                        />
                                                        <TextFieldPassword
                                                                control={control}
                                                                error={errors.newPassword}
                                                                field="newPassword"
                                                                label="New Password"
                                                        />
                                                        <TextFieldPassword
                                                                control={control}
                                                                error={errors.confirmPassword}
                                                                field="confirmPassword"
                                                                label="Confirm Password"
                                                        />
                                                        <FormBtn isLoading={apiState.isLoading} label="Update Password" />
                                                </Form>
                                        </div>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default ChangePassword;
