import * as React from "react";
import { UseFormRegister } from "react-hook-form";

export interface InputTextProps {
        name: string;
        label: string;
        error: string;
        register: UseFormRegister<any>;
        type?: "text" | "password";
}

const InputText: React.FC<InputTextProps> = ({ label, name, error, register, type = "text" }) => {
        return (
                <div className="space-y-2 flex-1">
                        <label className="block font-semibold" htmlFor={label}>
                                {label}
                        </label>
                        <input
                                className=" focus:outline-none px-2 py-1.5 w-full  duration-300 border focus:border-red-violet-500 rounded-sm"
                                id={name}
                                type={type}
                                {...register(name)}
                                autoComplete={type === "password" ? "off" : "on"}
                        />
                        {Boolean(error.length) && (
                                <p className="text-red-500 max-w-xs">
                                        {label} {error}
                                </p>
                        )}
                </div>
        );
};

export default InputText;
