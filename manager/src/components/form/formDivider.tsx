import * as React from "react";

export interface FormDividerProps {
        label: string;
}

const FormDivider: React.FC<FormDividerProps> = ({ label }) => {
        return (
                <div className="flex items-center">
                        <div className="flex-1 h-0.5 bg-gray-400"></div>
                        <div className="capitalize px-4">{label}</div>
                        <div className="flex-1  h-0.5 bg-gray-400"></div>
                </div>
        );
};

export default FormDivider;
