import * as React from "react";
import { UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { routers } from "../../common/constants/router";
import { ApiState } from "../../common/interface/api.interface";
import { UserLoginDto } from "../../common/interface/dto/auth.dto";
import { LocaleKey } from "../../common/interface/locale.interface";
import { FormWrapper } from "../../components/form";
import FormBottomLink from "../../components/form/formBottomLink";
import FormButton from "../../components/form/formBtn";
import FormDivider from "../../components/form/formDivider";
import InputText from "../../components/form/InputText";

export interface LoginPresentationProps {
        translate(key: LocaleKey, context?: any): string;
        errors: UserLoginDto;
        register: UseFormRegister<UserLoginDto>;
        apiState: ApiState;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
}

const LoginPresentation: React.FC<LoginPresentationProps> = ({ translate, errors, register, apiState, handleOnSubmit }) => {
        return (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500">
                        <FormWrapper title={translate("title-login")}>
                                <form onSubmit={handleOnSubmit} className="space-y-4">
                                        <InputText label={translate("field-username")} name="username" error={errors.username} register={register} />
                                        <InputText
                                                label={translate("field-password")}
                                                name="password"
                                                error={errors.password}
                                                register={register}
                                                type="password"
                                        />
                                        <div>
                                                <Link to={routers.forgotPassword.link}>
                                                        <div className="text-right font-medium duration-300 hover:text-blue-gem-500">
                                                                {translate("extra-forgotPassword")}
                                                        </div>
                                                </Link>
                                        </div>
                                        <FormButton label={translate("button-login")} isLoading={apiState.isLoading} />
                                        <FormDivider label={translate("extra-or")} />
                                        <FormBottomLink label={translate("link-registerInstead")} link={routers.register.link} />
                                </form>
                        </FormWrapper>
                </div>
        );
};

export default LoginPresentation;
