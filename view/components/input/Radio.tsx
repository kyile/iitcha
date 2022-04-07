import React, { useEffect } from "react";

// Radio Props
type Props = {
    id: string;
    label?: string;
    value?: any;
    children: JSX.Element | JSX.Element[];
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

    // 하위 component로 Radio.Option만 오도록 설정
    useEffect(() => {
        if (Array.isArray(children)) {
            const childrenValues = children.map((child) => child.props.id);
            children.forEach((child) => {
                const type = child.type.name;
                const value = child.props.value;

                // Radio.Option 외의 component가 있을 시 error throw
                if (type !== "Option") throw new Error(`Radio can only has Radio.Option in children.`);

                // Radio.Option의 value가 중복될 시 error throw
                if(childrenValues.filter((valueCurrent) => id === valueCurrent).length > 1) throw new Error(`Radio.Option's value can't be duplicated in the Radio: ${value}`);
            });
        }
        else {
            const type = children.type;

            // Radio.Option 외의 component가 있을 시 error throw
            if (type !== "Option") throw new Error(`Radio can only has Radio.Option in children.`);
        }
    }, [children]);

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
                const { disabled, value: optionValue } = child.props;
                const checked = child.props.value === value;

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
            const { disabled, value: optionValue } = children.props;
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