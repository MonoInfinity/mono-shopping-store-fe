import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useFormError from "../../common/hooks/useFormError";
import { useTranslate } from "../../common/hooks/useTranslate";
import { ApiState } from "../../common/interface/api.interface";
import { UserRegisterDto } from "../../common/interface/dto/auth.dto";
import { RootState, store } from "../../store";
import authThunk from "../../store/auth/thunk";
import RegisterPresentation from "./presentation";

export interface RegisterContainerProps {}

const defaultValues: UserRegisterDto = {
        name: "",
        password: "",
        username: "",
        confirmPassword: "",
        address: "",
        email: "",
        phone: "",
};

const RegisterContainer: React.FC<RegisterContainerProps> = () => {
        const { handleSubmit, register } = useForm<UserRegisterDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserRegisterDto>(defaultValues);
        const translate = useTranslate();

        const onSubmit = (data: UserRegisterDto) => {
                store.dispatch(authThunk.registerUser(data));
        };

        return (
                <RegisterPresentation
                        apiState={apiState}
                        errors={errors}
                        register={register}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        translate={translate}
                />
        );
};

export default RegisterContainer;
