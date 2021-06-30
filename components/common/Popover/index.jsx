import { useState, useEffect } from "react";
import { Popover as AntdPopover, Button } from "antd";
import styled from "styled-components";

const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: lightgray;
    margin: 4px 0;
`;


export const Popover = ({ children, actions }) => {
    const [visible, setVisible] = useState(false);

    const handleVisibleChange = (visible) => {
        console.log(visible);
        setVisible(visible);
    };

    return (
        <AntdPopover
            content={
                <ActionsWrapper>
                    {actions.map((action, index) => (
                        <>
                        <Button type="link"
                            onClick={() => {
                                handleVisibleChange(false);
                                action.func();
                            }}
                        >
                            {action.name}
                        </Button>
                        { index < actions.length - 1 && <Divider/>}
                        </>
                    ))}
                </ActionsWrapper>
            }
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            {children}
        </AntdPopover>
    );
};
