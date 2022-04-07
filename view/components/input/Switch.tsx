import React from "react";

type Props = {
    id: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (id?: string, checked?: boolean) => void;
}

const Switch = (props: Props) => {
    const { id, label, onChange } = props;
    const checked = props.checked ?? false;
    const disabled = props.disabled ?? false;

    // Switch change event handler
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange !== undefined) {
            const checked = event.target.checked;
            onChange(id, checked);
        }
    }

    return (
        <div className="form-check form-switch">
            <input 
                className="form-check-input"
                type="checkbox"
                role="switch"
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

export default Switch;