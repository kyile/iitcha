import React from "react";

type Direction = "row" | "col";
type AlignItems = "start" | "center" | "end";
type JustifyContents = "start" | "center" | "end" | "around" | "between" | "evenly";

type Props = {
    children: (string | JSX.Element)[] | JSX.Element | string,
    direction: Direction,
    size?: number,
    alignItems?: AlignItems,
    justifyContents?: JustifyContents
}

const Grid = (props: Props) => {
    const { direction, children, size } = props;
    const alignItems = props.alignItems ?? "start";
    const justifyContents = props.justifyContents ?? "around";
    let className: string = direction;

    if(direction === "col" && size !== undefined)
        className += `-${size}`;
    else 
        className = `${className} align-items-${alignItems} justify-contents-${justifyContents} g-0`;

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Grid;