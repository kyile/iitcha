import React from "react";
import { Size } from "../../common/utility";

type Props = {
    id: string;
    children: any;
    disabled?: boolean;
    size?: Size;
    onClick: (id?: string) => void;
}

const IconButton = (props: Props) => {
    const { id, children, onClick } = props;

    // Button click event handler
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(id);
    }

    return (
        <div id={id} className="ms-1 me-1" style={{cursor: "pointer"}} onClick={handleClick}>
            {children}
        </div>
    )
}

export default IconButton;