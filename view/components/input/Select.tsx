import React, { useEffect } from "react";
import { Size } from "../../common";

// Select Props
type Props = {
    id: string;
    children: React.ReactElement<typeof Option> | React.ReactElement<typeof Option>[];
    size?: Size;
    multiple?: boolean;
    label?: string;
    value?: any;
    onChange?: (id?: string, value?: any) => void;
}

// Select.Opion Props
type OptionProps = {
    value: any;
    selected?: boolean;
    children?: string;
}

// Select
const Select = (props: Props) => {
    const { id, children, label, value, onChange } = props;
    const multiple = props.multiple ?? false;
    const size = props.size ?? "md";
    const className = `form-select form-select-${size}`;

    // Select change event handler
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
                {children}
            </select>
        </div>
    );
}

// Select.Option
const Option = (props: OptionProps) => {
    const { value, children } = props;

    return (
        <option
            key={value}
            value={value}
        >
            {children ?? String(value)}
        </option>
    );
}

Select.Option = Option;
export default Select;