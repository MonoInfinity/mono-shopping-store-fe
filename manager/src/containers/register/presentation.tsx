import * as React from "react";
import { UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { routers } from "../../common/constants/router";
import { ApiState } from "../../common/interface/api.interface";
import { UserRegisterDto } from "../../common/interface/dto/auth.dto";
import { LocaleKey } from "../../common/interface/locale.interface";
import { FormWrapper } from "../../components/form";
import FormBottomLink from "../../components/form/formBottomLink";
import FormButton from "../../components/form/formBtn";
import FormDivider from "../../components/form/formDivider";
import InputText from "../../components/form/InputText";

export interface RegisterPresentationProps {
        translate(key: LocaleKey, context?: any): string;
        errors: UserRegisterDto;
        register: UseFormRegister<UserRegisterDto>;
        apiState: ApiState;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
}

const RegisterPresentation: React.FC<RegisterPresentationProps> = ({ apiState, errors, register, translate, handleOnSubmit }) => {
        return (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500">
                        <FormWrapper title={translate("title-register")}>
                                <form onSubmit={handleOnSubmit} className="space-y-4 p-4">
                                        <div className="flex space-x-4">
                                                <InputText
                                                        label={translate("field-username")}
                                                        name="username"
                                                        error={errors.username}
                                                        register={register}
                                                />
                                                <InputText label={translate("field-name")} name="name" error={errors.name} register={register} />
                                        </div>

                                        <div className="flex space-x-4">
                                                <InputText
                                                        label={translate("field-password")}
                                                        name="password"
                                                        error={errors.password}
                                                        register={register}
                                                        type="password"
                                                />
                                                <InputText
                                                        label={translate("field-confirmPassword")}
                                                        name="confirmPassword"
                                                        error={errors.password}
                                                        register={register}
                                                        type="password"
                                                />
                                        </div>

                                        <div className="flex space-x-4">
                                                <InputText label={translate("field-email")} name="email" error={errors.email} register={register} />
                                                <InputText label={translate("field-phone")} name="phone" error={errors.phone} register={register} />
                                        </div>

                                        <div className="flex space-x-4">
                                                <InputText
                                                        label={translate("field-address")}
                                                        name="address"
                                                        error={errors.address}
                                                        register={register}
                                                />
                                        </div>

                                        <FormButton label={translate("button-register")} isLoading={apiState.isLoading} />
                                        <FormDivider label={translate("extra-or")} />
                                        <FormBottomLink label={translate("link-loginInstead")} link={routers.login.link} />
                                </form>
                        </FormWrapper>
                </div>
        );
};

export default RegisterPresentation;
