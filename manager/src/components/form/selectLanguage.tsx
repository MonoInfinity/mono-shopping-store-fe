import * as React from "react";

export interface SelectLanguageProps {
        handleOnChange(input: React.ChangeEvent<HTMLSelectElement>): void;
        defaultValue: string;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ handleOnChange, defaultValue }) => {
        return (
                <select
                        onChange={handleOnChange}
                        value={defaultValue}
                        className="focus:outline-none  border-2  duration-300 rounded-sm flex items-center px-2 py-1"
                >
                        <option value="en">English</option>
                        <option value="vi">Vietnamese</option>
                </select>
        );
};

export default SelectLanguage;
