import { Input as AntdInput } from "antd";
import styled, { css } from "styled-components";

export const StyledInput = styled(AntdInput)`
  .ant-input-prefix {
    color: #ccc;
  }

  .ant-input.ant-input-lg {
    font-size: 14px;
  }

  .ant-input {
    ${(props) =>
      props.noBorder &&
      css`
        border: 0;
      `}
  }
`;

function parseValue(ev) {
  if (ev?.target) {
    return ev?.target?.value;
  }

  return ev;
}

export default function Input({ onChange = () => {}, ...rest }) {
  return <StyledInput {...rest} onChange={(ev) => onChange(parseValue(ev))} />;
}
