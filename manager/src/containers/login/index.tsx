import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useFormError from "../../common/hooks/useFormError";
import { useTranslate } from "../../common/hooks/useTranslate";
import { ApiState } from "../../common/interface/api.interface";
import { UserLoginDto } from "../../common/interface/dto/auth.dto";
import { RootState, store } from "../../store";
import authThunk from "../../store/auth/thunk";
import LoginPresentation from "./presentation";

export interface LoginContainerProps {}
const defaultValues: UserLoginDto = {
        password: "",
        username: "",
};

const LoginContainer: React.FC<LoginContainerProps> = () => {
        const { handleSubmit, register } = useForm<UserLoginDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserLoginDto>(defaultValues);
        const translate = useTranslate();

        const onSubmit = (data: UserLoginDto) => {
                store.dispatch(authThunk.loginUser(data));
        };

        return (
                <LoginPresentation
                        translate={translate}
                        errors={errors}
                        register={register}
                        apiState={apiState}
                        handleOnSubmit={handleSubmit(onSubmit)}
                />
        );
};

export default LoginContainer;
