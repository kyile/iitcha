import React, { useEffect } from "react";

// Radio Props
type Props = {
    id: string;
    label?: string;
    value?: any;
    children: React.ReactElement<typeof Option> | React.ReactElement<typeof Option>[];
    onChange?: (id: string, value?: any) => void;
}

// Radio.Option Props
type OptionProps = {
    value: any;
    children?: string | JSX.Element | SVGElement;
    disabled?: boolean;
}

// Radio
const Radio = (props: Props) => {
    const { id, value, label, children, onChange } = props;

    // Radio check change event handler
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange !== undefined && event.target.checked) {
            const value = event.target.value;
            onChange(id, value);
        }
    }

    // Option render
    const renderOptions = () => {
        if (Array.isArray(children)) {
            return children.map((child) => {
                const { disabled, value: optionValue } = (child as JSX.Element).props;
                const checked = (child as JSX.Element).props.value === value;

                return (
                    <div className="form-check" key={optionValue}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name={id}
                            id={id}
                            disabled={disabled}
                            value={optionValue}
                            checked={checked}
                            onChange={handleChange}
                        />
                        {child}
                    </div>
                );
            });
        }
        else {
            const { disabled, value: optionValue } = (children as JSX.Element).props;
            const checked = optionValue === value;

            return (
                <div className="form-check" key={optionValue}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={id}
                        id={id}
                        disabled={disabled}
                        value={optionValue}
                        checked={checked}
                        onChange={handleChange}
                    />
                    {children}
                </div>
            );
        }
    }

    return (
        <div id={id}>
            {label}
            <div id={id}>
                {renderOptions()}
            </div>
        </div>
    );
}

const Option = (props: OptionProps) => {
    return (
        <label className="form-check-label" htmlFor={props.value}>
            {props.children ?? props.value}
        </label>
    );
}

Radio.Option = Option;
export default Radio;