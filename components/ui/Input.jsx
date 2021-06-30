import { useRef } from "react";
import styled from "styled-components";
import { Input as AntdInput } from "antd";

export const StyledInput = styled.div`
    padding: ${props => props.small ? "6px 20px" : "12px 20px"};
    border: 1px solid #F0F0F0;
    box-sizing: border-box;
    border-radius: 4px;
    background: white;

    label {
        color: #c0c0c0;
    }

    input, textarea {
        border: none;
        padding: 0 !important;
        &:focus {
            outline: none !important;
            box-shadow: none !important;
        }
    }
`;

function parseValue(ev) {
    if (ev?.target) {
        return ev?.target?.value;
    }

    return ev;
}

export default function Input({ onChange = () => {}, small, ...rest }) {
    const inputRef = useRef(null);

    const onInputWrapperSelect = () => {
        inputRef.current.focus({
            cursor: "end",
        });
    };

    return (
        <StyledInput small={small} onClick={onInputWrapperSelect}>
            <label htmlFor="">{rest.label}</label>
            {rest.textarea ? (
                <AntdInput.TextArea
                    ref={inputRef}
                    {...rest}
                    onChange={(ev) => onChange(parseValue(ev))}
                />
            ) : (
                <AntdInput
                    ref={inputRef}
                    {...rest}
                    onChange={(ev) => onChange(parseValue(ev))}
                />
            )}
        </StyledInput>
    );
}
