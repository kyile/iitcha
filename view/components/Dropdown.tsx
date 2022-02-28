import React, { useEffect, useState } from "react";
import { ButtonType, Size } from "../common";

export type DropdownItem = {
    type: "a" | "button" | "header" | "divider";
    value: any;
    display?: string;
    disable? : boolean;
}

type Props = {
    id: string;
    label: string;
    value?: any;
    type?: ButtonType;
    size?: Size;
    showActiveItem?: boolean;
    items: DropdownItem[];
    onChange: (id:string, value: any) => void;
}

const Dropdown = (props: Props) => {
    const { id, items, label, value, onChange } = props;
    const type = props.type ?? "primary";
    const size = props.size ?? "md";
    const showActiveItem = props.showActiveItem ?? false;
    const className = `btn btn-${type} btn-${size} dropdown-toggle`;
    const [displayValue, setDisplayValue] = useState<string>(label);

    // value 중복 확인
    useEffect(() => {
        const itemValues = items.map((item) => item.value);

        itemValues.forEach((value) => {
            const isDuplicate = itemValues.filter((valueCurrent) => value === valueCurrent).length > 1;

            // value 중복 존재할 경우 error throw
            if(isDuplicate) {
                throw new Error(`Dropdown items has duplicated values: ${value}`);
            }
        });
    }, [items]);

    // Dropdown display set
    useEffect(() => {
        if(value !== undefined && showActiveItem) {
            const currentValue = items.filter((item) => item.value === value);
            if(currentValue.length > 0){
                const display = currentValue[0].display ?? value;
                setDisplayValue(display);
            }
        }
    }, [value])

    // item click event handler
    const itemClick = (value: any) => {
        onChange(id, value);
    }

    return (
        <div id={id} className="dropdown">
            <button className={className} type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                {displayValue}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                {items.map((item) => {
                    const checked = item.value === value;
                    const disable = item.disable ?? false;
                    const display = item.display ?? item.value;
                    const className = (checked ? "active " : " ").concat(disable ? "disabled" : "");
                    let returnValue: JSX.Element;
                    // item type에 따라 rendering
                    switch(item.type) {
                        case "a" :
                            returnValue = (
                                <a className={`dropdown-item ${className}`} href={item.value}>
                                    {display}
                                </a>
                            );
                            break;
                        case "button" :
                            returnValue = (
                                <button className={`dropdown-item ${className}`} type="button" value={item.value} onClick={() => { itemClick(item.value);}}>
                                    {display}
                                </button>
                            )
                            break;
                        case "divider" :
                            returnValue = (
                                <hr className="dropdown-divider"/>
                            );
                            break;
                        case "header" :
                            returnValue = (
                                <h6 className="dropdown-header">
                                    {display}
                                </h6>
                            );
                            break;
                    }
                    return returnValue = <li key={item.value}> {returnValue} </li> ;
                })}
            </ul>
        </div>
    )
}

export default Dropdown;