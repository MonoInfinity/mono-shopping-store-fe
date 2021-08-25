import * as React from "react";
import { WaveLoading } from "../loading";

export interface FormButtonProps {
        label: string;
        isLoading: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ label, isLoading }) => {
        return isLoading ? (
                <WaveLoading />
        ) : (
                <button className="w-full bg-blue-gem-500 py-1 font-semibold duration-300 hover:bg-blue-gem-400 text-white rounded-sm">
                        {label}
                </button>
        );
};

export default FormButton;
