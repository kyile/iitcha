import React, { useEffect } from "react";
import { ButtonType, Size } from "../common";

// Dropdown Props
type Props = {
    id: string;
    children: JSX.Element | JSX.Element[];
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

    // 하위 component로 Dropdown.Item, Dropdown.Divider만 오도록 설정
    useEffect(() => {
        if (Array.isArray(children)) {
            const childrenIds = children.filter((child) => child.type === "Item").map((child) => child.props.id);
            children.forEach((child) => {
                const type = child.type.name;
                const id = child.props.id;

                // Dropdown.Item, Dropdown.Divider 외의 component가 있을 시 error throw
                if (type !== "Item" && type !== "Divider") throw new Error(`Dropdown can only has Dropdown.Item, Dropdown.Divider in children`);

                // Dropdown.Item의 id가 중복될 시 error throw
                if(childrenIds.filter((idCurrent) => id === idCurrent).length > 1) throw new Error(`Dropdown.Item's id can't be duplicated in the Dropdown: ${id}`);
            });
        }
        else {
            const type = children.type;

            // Dropdown.Item, Dropdown.Divider 외의 component가 있을 시 error throw
            if (type !== "Item" && type !== "Divider") throw new Error(`Dropdown can only has Dropdown.Item, Dropdown.Divider in children`);
        }
    }, [children]);

    return (
        <div id={id} className="dropdown">
            <button className={className} type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                {label}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
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
    const handleClick = () => {
        onClick(id);
    }

    return (
        <li>
            <button className={className} id={id} type="button" onClick={handleClick}>
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