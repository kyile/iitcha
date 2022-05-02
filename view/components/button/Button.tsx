import React from "react";
import { ButtonType, Size } from "../../common";

type Props = {
    id: string;
    children: JSX.Element | string | (string | JSX.Element)[];
    disabled?: boolean;
    type?: ButtonType;
    size?: Size;
    onClick: (id?: string) => void;
}

const Button = (props: Props) => {
    const { id, children, onClick } = props;
    const disabled = props.disabled ?? false;
    const type = props.type ?? "primary";
    const size = props.size ?? "md";
    const className = `btn btn-${type} btn-${size} ms-1 me-1`;

    // Button click event handler
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(id);
    }

    return (
        <button
            id={id}
            type="button"
            disabled={disabled}
            className={className}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Button;