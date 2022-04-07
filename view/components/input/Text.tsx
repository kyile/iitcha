import React, { ChangeEvent, useEffect, useState } from "react";
import { Size } from "../../common";

type Props = {
    id: string;
    label?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    required?: boolean;
    validFeedBack?: string;
    invalidFeedBack?: string;
    onChange?: (id?: string, value?: string) => void;
    onValidate?: (id?: string, value?: string) => boolean;
}

const Text = (props: Props) => {
    const { id, label, value, placeholder, validFeedBack, invalidFeedBack, onChange, onValidate } = props;
    const required = props.required ?? false;
    const disabled = props.disabled ?? false;
    const size = props.size ?? "md";
    const validate = required || onValidate !== undefined;

    const [isValid, setIsValid] = useState<boolean>();

    const inputGroupClassName = `input-group ${validate ? "has-validation" : ""}`;
    const inputClassName = `form-control form-control-${size} ${isValid !== undefined ? isValid ? "is-valid" : "is-invalid" : ""}`;

    // validation
    useEffect(() => {
        if (value !== undefined) {
            if (required) {
                if (value.length === 0) setIsValid(false);
                else setIsValid(true);
            }
            else if (onValidate !== undefined) setIsValid(onValidate(id, value));
        }
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if(onChange !== undefined) {
            onChange(id, value);
        }
    }

    return (
        <div>
            {label !== undefined ? (
                <label htmlFor={id}>
                    {label}
                </label>
            ) : ("")}
            <div className={inputGroupClassName}>
                <input
                    id={id}
                    className={inputClassName}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                />
                {validate && (
                    <>
                        {validFeedBack !== undefined ? (
                            <div className="valid-feedback">{validFeedBack}</div>
                        ) : ("")}
                        {invalidFeedBack !== undefined ? (
                            <div className="invalid-feedback">{invalidFeedBack}</div>
                        ) : ("")}
                    </>
                )}
            </div>
        </div>
    )
}

export default Text;