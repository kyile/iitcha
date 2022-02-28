import React from "react";

type RadioOption = {
    value: any;
    display?: string;
    disabled?: boolean;
}

type Props = {
    id: string;
    label?: string;
    value?: any;
    options: RadioOption[];
    onChange?: (id: string, value?: any) => void;
}

const Radio = (props: Props) => {
    const { id, value, label, options, onChange } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange !== undefined && event.target.checked) {
            const value = event.target.value;
            onChange(id, value);
        }
    }

    return (
        <div id={id}>
            {label}
            <div id={id}>
                {options.map((option) => {
                    const display = option.display ?? option.value;
                    const checked = option.value === value;
                    return (
                        <div className="form-check" key={option.value}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name={id}
                                id={id}
                                disabled={option.disabled}
                                value={option.value}
                                checked={checked}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={id}>
                                {display}
                            </label>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Radio;