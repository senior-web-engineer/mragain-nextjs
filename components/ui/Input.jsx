import styled from "styled-components";

export const StyledInput = styled.input`
  border: 0;
  padding: 0;
`

function parseValue(ev) {
  if (ev?.target) {
    return ev?.target?.value;
  }

  return ev;
}

export default function Input({onChange = () => {}, ...rest}) {
  return <StyledInput {...rest} onChange={(ev) => onChange(parseValue(ev))}/>
}
