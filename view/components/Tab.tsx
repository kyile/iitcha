import React, { useEffect } from "react";

// Tab Props
type Props = {
    id: string;
    children: JSX.Element | JSX.Element[];
    index?: number;
    onTabClick?: (id?: string, index?: number) => void;
}

// Tab.Sub Props
type TabSubProps = {
    id: string;
    label: string;
    children: JSX.Element | JSX.Element[];
}

const Tab = (props: Props) => {
    const { id, onTabClick, children } = props;
    const currentIdx = props.index ?? 0;

    // 하위 component로 Tab.Sub만 오도록 설정
    useEffect(() => {
        if(Array.isArray(children)) {
            const childrenIds = children.map((child) => child.props.id);
            children.forEach((child) => {
                const type = child.type.name;
                const id = child.props.id;
                // Tab.Sub 외의 component가 있을 시 error throw
                if(type !== "Sub") {
                    throw new Error(`Tab can only has Tab.Sub in children: ${type}`);
                }

                // Tab.Sub의 id가 중복될 시 error throw
                if(childrenIds.filter((idCurrent) => id === idCurrent).length > 1) {
                    throw new Error(`Tab.Sub's id can't be duplicated in the Tab: ${id}`);
                }
            });
        }
        else {
            const type = children.type.name
            // Tab.Sub 외의 component가 있을 시 error throw
            if(type !== "Sub") {
                throw new Error(`Tab can only has Tab.Sub in children: ${type}`);
            }
        }
    }, [children]);

    // Tab click event handler
    const handleTabClick = (id: string, index: number) => {
        if(onTabClick !== undefined) {
            onTabClick(id, index);
        }
    }

    // Tab navigation rendering
    const tabNav = () => {
        // Array일 경우와 하나의 component일 경우 구분하여 진행
        if(Array.isArray(children)) {
            return children.map((child, idx) => {
                const label = child.props.label;
                const id = child.props.id
                const navId = `nav-${id}-tab`;
                const target = `#nav-${id}`;
                const ariaControls = `nav-${id}`;
                const className = `nav-link ${idx === currentIdx ? "active" : ""}`;

                return (
                    <button
                        className={className}
                        id={navId}
                        data-bs-toggle="tab"
                        data-bs-target={target}
                        type="button"
                        role="tab"
                        aria-controls={ariaControls}
                        onClick={()=>{handleTabClick(id, idx)}}
                        key={id}
                    >
                        {label}
                    </button>
                );
            });
        }
        else {
            const label = children.props.label;
            const id = children.props.id
            const navId = `nav-${id}-tab`;
            const target = `#nav-${id}`;
            const ariaControls = `nav-${id}`;

            return (
                    <button
                        className="nav-link active"
                        id={navId} data-bs-toggle="tab"
                        data-bs-target={target}
                        type="button"
                        role="tab"
                        aria-controls={ariaControls}
                        key={id}
                    >
                        {label}
                    </button>
                
            );
        }
    }

    // Tab contents rendering
    const tabContent = () => {
        // Array일 경우와 하나의 component일 경우 구분하여 진행
        if(Array.isArray(children)) {
            return children.map((child, idx) => {
                const id = child.props.id;
                const currentChildren = child.props.children;
                const tabId = `nav-${id}`;
                const ariaLabel = `${tabId}-tab`;
                const className = `tab-pane ${idx === currentIdx ? " show active" : ""}`;

                return (
                    <div className={className} id={tabId} role="tabpanel" aria-labelledby={ariaLabel} key={id}>
                        {currentChildren}
                    </div>
                );
            });
        }
        else {
            const id = children.props.id;
            const currentChildren = children.props.children;
            const tabId = `nav-${id}`;
            const ariaLabel = `${tabId}-tab`;

            return (
                <div className="tab-pane show active" id={tabId} role="tabpanel" aria-labelledby={ariaLabel}>
                    {currentChildren}
                </div>
            );
        }
    }

    return (
        <div id={id}>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {tabNav()}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {tabContent()}
            </div>
        </div>
    );
}

// Tab.Sub
const Sub = (props: TabSubProps) => {
    const { id, children } = props;

    return (
        <div id={id}>
            {children}
        </div>
    );
}

Tab.Sub = Sub;
export default Tab;