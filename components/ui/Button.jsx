import styled from "styled-components";

const Button = styled.button`
  background-color: #06c987;
  color: #fff;
  min-width: 130px;
  padding: 7px;
  height: 51px;
  line-height: 37px;
  border: 0;
  text-align: center;
  border-radius: 25px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;

  &[disabled] {
    background-color: #a0a0a0;
  }

  &:hover {
    color: #fff;
  }
`

export const TextButton = styled(Button)`
  background-color: transparent;
  color: #404040;
  min-width: auto;

  &:hover {
    color: #06c987;
  }
`

export default Button;
