import React from "react";
import { ButtonType, Size } from "../../common";

// Dropdown Props
type Props = {
    id: string;
    children: React.ReactElement<typeof Item | typeof Divider> | React.ReactElement<typeof Item | typeof Divider>[];
    label?: string;
    type?: ButtonType;
    size?: Size;
}

// Dropdown.ItemProps
type ItemProps = {
    id: string;
    children?: string | JSX.Element | SVGElement;
    active?: boolean;
    onClick: (id?: string) => void;
}

// Dropdown
const Dropdown = (props: Props) => {
    const { id, label, children } = props;
    const type = props.type ?? "primary";
    const size = props.size ?? "md";
    const className = `btn btn-${type} btn-${size} dropdown-toggle`;

    return (
        <div id={id} className="dropdown">
            <button
                className={className}
                type="button"
                id="dropdownMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {label}
            </button>
            <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenu"
            >
                {children}
            </ul>
        </div>
    )
}

// Dropdown.Item
const Item = (props: ItemProps) => {
    const { id, active, onClick } = props;
    const display = props.children ?? id; 

    const className = `dropdown-item ${active ? "active" : ""}`;
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.preventDefault();
        onClick(id);
    }

    return (
        <li>
            <button
                className={className}
                id={id}
                type="button"
                onClick={handleClick}
            >
                {display}
            </button>
        </li>
    )
}

// Dropdown.Divider
const Divider = () => {
    return (
        <li>
            <hr className="dropdown-divider"/>
        </li>
    )
}

Dropdown.Item = Item;
Dropdown.Divider = Divider;
export default Dropdown;