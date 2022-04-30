import React, { ChangeEvent, useEffect, useState } from "react";
import { Size } from "../../common";

type TextType = "text" | "password" | "email" | "number";

type Props = {
    id: string;
    type?: TextType;
    label?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    required?: boolean;
    validate?: boolean;
    validFeedBack?: string;
    invalidFeedBack?: string;
    onChange?: (id?: string, value?: string) => void;
    onValidate?: (id?: string, value?: string) => boolean;
}

const Text = (props: Props) => {
    const { id, label, value, placeholder, validFeedBack, invalidFeedBack, onChange, onValidate } = props;
    const type = props.type ?? "text";
    const required = props.required ?? false;
    const disabled = props.disabled ?? false;
    const size = props.size ?? "md";
    const validateProps = props.validate ?? true;
    const validate = (required || onValidate !== undefined) && value !== undefined && validateProps;

    const [isValid, setIsValid] = useState<boolean>();

    // validate 유무에 따라 class 변경
    const inputGroupClassName = `input-group ${validate ? "has-validation" : ""}`;
    const inputClassName = `form-control form-control-${size} ${(isValid !== undefined && validate) ? isValid ? "is-valid" : "is-invalid" : ""}`;

    // validation
    useEffect(() => {
        if (value !== undefined) {
            if (required) setIsValid(value.length > 0);
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
        <div className="ms-1 me-1">
            {label !== undefined ? (
                <label htmlFor={id}>
                    {label}
                </label>
            ) : ("")}
            <div className={inputGroupClassName}>
                <input
                    id={id}
                    className={inputClassName}
                    type={type}
                    placeholder={placeholder}
                    value={value ?? ""}
                    disabled={disabled}
                    onChange={handleChange}
                />
                {validate && (
                    <>
                        <div className="valid-feedback">
                            {validFeedBack}
                        </div>
                        <div className="invalid-feedback">
                            {invalidFeedBack}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Text;