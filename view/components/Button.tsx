import React from "react";
import { ButtonType, Size } from "../common";

type Props = {
    id: string;
    children: JSX.Element | string;
    type?: ButtonType;
    size?: Size;
    onClick: (id?: string) => void;
}

const Button = (props: Props) => {
    const { id, children, onClick } = props;
    const type = props.type ?? "primary";
    const size = props.size ?? "md";
    const className = `btn btn-${type} btn-${size}`;

    // Button click event handler
    const handleClick = () => {
        onClick(id);
    }

    return (
        <button
            id={id}
            type="button"
            className={className}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Button;