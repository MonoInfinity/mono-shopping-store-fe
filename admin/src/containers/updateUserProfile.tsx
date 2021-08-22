import { Form, Image } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";
import routers from "../common/constants/router";
import { UpdateUserDto } from "../common/interface/dto/user.dto";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useFormError from "../common/hooks/userFormError";
import { RootState } from "../store";
import { ApiState } from "../common/interface/api.interface";
import TextField from "../components/form/textField";
import FormBtn from "../components/form/formBtn";
import { AuthState } from "../common/interface/user.interface";
import userAPI from "../api/userApi";
import FormMsg from "../components/form/formMsg";
import { useUploadFile } from "../common/hooks/useUploadFile";

export interface UpdateUserProfileProps {}

const defaultValues: UpdateUserDto = { address: "", email: "", name: "", phone: "", avatarUrl: "" };

const UpdateUserProfile: React.FC<UpdateUserProfileProps> = () => {
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const { handleSubmit, control, setValue } = useForm<UpdateUserDto>({ defaultValues });
        const errors = useFormError<UpdateUserDto>(defaultValues);
        const [file, handleOnChangeFile] = useUploadFile();

        const onSubmit = (data: UpdateUserDto) => {
                if (file) {
                        userAPI.uploadFile(file).then((res) => {
                                const avatarUrl = res.data.data;
                                userAPI.updateUser({ ...data, avatarUrl });
                        });
                }

                // if (file) userAPI.updateUser(data);
        };

        React.useEffect(() => {
                setValue("address", authState.address);
                setValue("email", authState.email);
                setValue("name", authState.name);
                setValue("phone", authState.phone);
        }, [authState, setValue]);

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="space-y-4">
                                <button className="font-semibold ">
                                        <Link to={routers.viewMyProfile.link}>Go Back</Link>
                                </button>

                                <div className="">
                                        <div className="px-2 py-4 space-y-8 border w-96 fade-in">
                                                <h1 className="text-4xl font-semibold text-center">Update Information</h1>
                                                <Form className="" name="basic" layout="vertical" onFinish={handleSubmit(onSubmit)}>
                                                        <Image
                                                                width={200}
                                                                preview={false}
                                                                src={file ? URL.createObjectURL(file) : authState.avatarUrl}
                                                                className="border"
                                                        ></Image>

                                                        <input type="file" onChange={handleOnChangeFile} name="avatar" />
                                                        <FormMsg
                                                                isError={apiState.isError}
                                                                errorMessage={apiState.errorMessage}
                                                                message={apiState.message}
                                                                isLoading={apiState.isLoading}
                                                        />
                                                        <TextField control={control} error={errors.name} field="name" label="Name" />
                                                        <TextField control={control} error={errors.email} field="email" label="Email" />
                                                        <TextField control={control} error={errors.address} field="address" label="address" />
                                                        <TextField control={control} error={errors.phone} field="phone" label="Phone" />
                                                        <FormBtn isLoading={apiState.isLoading} label="Submit" />
                                                </Form>
                                        </div>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default UpdateUserProfile;
