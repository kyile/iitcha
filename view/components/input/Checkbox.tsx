import React from "react";

type Props = {
    id: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean
    onChange?: (id?: string, checked?: boolean) => void;
}

const Checkbox = (props: Props) => {
    const { id, label, onChange } = props;
    const checked = props.checked ?? false;
    const disabled = props.disabled ?? false;

    // Checkbox change event handler
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange !== undefined) {
            const value = event.target.checked;
            onChange(id, value);
        }
    }

    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={id}
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
            />
            {
                label !== undefined ? (
                    <label className="form-check-label" htmlFor={id}>
                        {label}
                    </label>
                ) : ("")
            }
        </div>
    )
}

export default Checkbox;