import React, { ChangeEvent } from "react";
import { Size } from "../../common";

type Props = {
    id: string;
    label?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    onChange?: (id?: string, value?: string) => void;
}

const Text = (props: Props) => {
    const { id, label, value, placeholder, onChange } = props;
    const disabled = props.disabled ?? false;
    const size = props.size ?? "md";
    const className = `form-control form-control-${size}`;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(onChange !== undefined) {
            const value = event.target.value;
            onChange(id, value);
        }
    }

    return (
        <div>
            {
                label !== undefined ? (
                    <label htmlFor={id}>
                        {label}
                    </label>
                ) : ("")
            }
            <input
                id={id}
                className={className}
                type="text"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={handleChange}
            />
        </div>
    )
}

export default Text;