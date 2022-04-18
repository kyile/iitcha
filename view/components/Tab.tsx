import React from "react";

// Tab Props
type Props = {
    id: string;
    children: React.ReactElement<typeof Sub> | React.ReactElement<typeof Sub>[];
    index?: number;
    onTabClick?: (id?: string, index?: number) => void;
}

// Tab.Sub Props
type TabSubProps = {
    id: string;
    label: string;
    title?: string;
    children: JSX.Element | JSX.Element[];
}

const Tab = (props: Props) => {
    const { id, onTabClick, children } = props;
    const currentIdx = props.index ?? 0;

    // Tab click event handler
    const handleTabClick = (id: string, index: number) => {
        if(onTabClick !== undefined) onTabClick(id, index);
    }

    // Tab navigation render
    const renderNav = () => {
        // Array일 경우와 하나의 component일 경우 구분하여 진행
        if(Array.isArray(children)) {
            return children.map((child, idx) => {
                const { label, id } = (child as JSX.Element).props;
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
            const { label, id } = (children as JSX.Element).props;
            const navId = `nav-${id}-tab`;
            const target = `#nav-${id}`;
            const ariaControls = `nav-${id}`;

            return (
                <button
                    className="nav-link active"
                    id={navId}
                    data-bs-toggle="tab"
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

    // Tab contents render
    const renderContent = () => {
        // Array일 경우와 하나의 component일 경우 구분하여 진행
        if(Array.isArray(children)) {
            return children.map((child, idx) => {
                const { id, title, children: subChildren} = (child as JSX.Element).props;
                const tabId = `nav-${id}`;
                const ariaLabel = `${tabId}-tab`;
                const className = `tab-pane ${idx === currentIdx ? " show active" : ""}`;

                return (
                    <div
                        className={className}
                        id={tabId}
                        role="tabpanel"
                        aria-labelledby={ariaLabel}
                        key={id}
                    >
                        <h5>
                            {title}
                        </h5>
                        {subChildren}
                    </div>
                );
            });
        }
        else {
            const { id, title, children: subChildren } = (children as JSX.Element).props;
            const tabId = `nav-${id}`;
            const ariaLabel = `${tabId}-tab`;

            return (
                <div
                    className="tab-pane show active"
                    id={tabId}
                    role="tabpanel"
                    aria-labelledby={ariaLabel}
                >
                    <h5>
                        {title}
                    </h5>
                    {subChildren}
                </div>
            );
        }
    }

    renderNav();
    return (
        <div id={id}>
            <nav>
                <div
                    className="nav nav-tabs"
                    id="nav-tab"
                    role="tablist"
                >
                    {renderNav()}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {renderContent()}
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