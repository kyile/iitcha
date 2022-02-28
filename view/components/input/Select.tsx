import React from "react";
import { Size } from "../../common";

type SelectOptions = {
    value: any;
    display?: string;
    selected?: boolean;
}

type Props = {
    id: string;
    options: SelectOptions[];
    size?: Size;
    multiple?: boolean;
    label?: string;
    value?: any;
    onChange?: (id?: string, value?: any) => void;
}

const Select = (props: Props) => {
    const { id, options, label, value, onChange } = props;
    const multiple = props.multiple ?? false;
    const size = props.size ?? "md";

    const className = `form-select form-select-${size}`;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(onChange !== undefined) {
            const value = event.target.value;
            onChange(id, value);
        }
    }

    return (
        <div>
            {label !== undefined ? (
                    <label className="form-label" htmlFor={id}>
                        {label}
                    </label>
                ) : ("")
            }
            <select
                className={className}
                id={id}
                multiple={multiple}
                onChange={handleChange}
                value={value}
            >
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.display ?? option.value}
                        </option>
                    )
                })}
            </select>
        </div>
        
    )
}

export default Select;