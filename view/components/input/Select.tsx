import React, { useEffect } from "react";
import { Size } from "../../common";

// Select Props
type Props = {
    id: string;
    children: JSX.Element | JSX.Element[];
    size?: Size;
    multiple?: boolean;
    label?: string;
    value?: any;
    onChange?: (id?: string, value?: any) => void;
}

// Select.Opion Props
type OptionProps = {
    value: any;
    display?: string;
    selected?: boolean;
}

// Select
const Select = (props: Props) => {
    const { id, children, label, value, onChange } = props;
    const multiple = props.multiple ?? false;
    const size = props.size ?? "md";

    const className = `form-select form-select-${size}`;

    // 하위 component로 Select.Option만 오도록 설정
    useEffect(() => {
        if (Array.isArray(children)) {
            const childrenValues = children.map((child) => child.props.value);
            children.forEach((child) => {
                const type = child.type.name;
                const value = child.props.value;

                // Select.Option 외의 component가 있을 시 error throw
                if (type !== "Option") throw new Error(`Select can only has Select.Option in children.`);

                // Select.Option의 value가 중복될 시 error throw
                if(childrenValues.filter((valueCurrent) => value === valueCurrent).length > 1) throw new Error(`Select.Option's value can't be duplicated in the Select: ${value}`);
            });
        }
        else {
            const type = children.type;

            // Select.Option 외의 component가 있을 시 error throw
            if (type !== "Option") throw new Error(`Select can only has Select.Option in children.`);
        }
    }, [children]);

    // Select change event handler
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(onChange !== undefined) {
            const value = event.target.value;
            onChange(id, value);
        }
    }

    // Option render
    const renderOptions = () => {
        if (Array.isArray(children)) {
            return children.map((child) => (
                <option key={child.props.value} value={child.props.value}>
                    {child.props.display ?? child.props.value}
                </option>)
            );
        }
        else {
            return (
                <option key={children.props.value} value={children.props.value}>
                    {children.props.display ?? children.props.value}
                </option>
            );
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
                {renderOptions()}
            </select>
        </div>
    );
}

// Select.Option
const Option = (props: OptionProps) => {
    return (
        <option key={props.value} value={props.value}>
            {props.display ?? props.value}
        </option>
    );
}

Select.Option = Option;
export default Select;