import * as React from "react";

export interface FormWrapperProps {
        title: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {
        return (
                <div className="bg-white bg-opacity-90 py-12 px-4 space-y-6 rounded-md shadow-lg min-w-87.5 fade-in">
                        <h1 className="font-semibold text-3xl text-center">{title}</h1>
                        {children}
                </div>
        );
};

export default FormWrapper;
