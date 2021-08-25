import * as React from "react";
import { Link } from "react-router-dom";

export interface FormBottomLinkProps {
        link: string;
        label: string;
}

const FormBottomLink: React.FC<FormBottomLinkProps> = ({ label, link }) => {
        return (
                <div>
                        <Link to={link}>
                                <div className="text-center font-medium duration-300 text-white bg-blue-gem-500 hover:bg-blue-gem-400 rounded-sm  py-1.5">
                                        {label}
                                </div>
                        </Link>
                </div>
        );
};

export default FormBottomLink;
