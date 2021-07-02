import { useRef } from "react";
import styled from "styled-components";
import { Input as AntdInput, InputNumber } from "antd";

export const StyledInput = styled.div`
  box-sizing: border-box;
  border: none;
  background: white;

  input,
  textarea {
    border: none;
    padding: 0 !important;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  .ant-input-group-addon:first-child {
    background: transparent;
    border: none;
    color: #c0c0c0;
    padding-left: 0;
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

  if (rest.textarea) {
    return (
      <StyledInput small={small} onClick={onInputWrapperSelect}>
        <AntdInput.TextArea
          ref={inputRef}
          {...rest}
          onChange={(ev) => onChange(parseValue(ev))}
        />
      </StyledInput>
    );
  }

  if (rest.number) {
    <StyledInput small={small} onClick={onInputWrapperSelect}>
      <InputNumber
        ref={inputRef}
        {...rest}
        onChange={(ev) => onChange(parseValue(ev))}
      />
    </StyledInput>;
  }

  return (
    <StyledInput small={small} onClick={onInputWrapperSelect}>
      <AntdInput
        ref={inputRef}
        {...rest}
        onChange={(ev) => onChange(parseValue(ev))}
      />
    </StyledInput>
  );
}
