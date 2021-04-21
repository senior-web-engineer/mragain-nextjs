import styled from "styled-components";

export const RegisterFormArea = styled.div`
  color: #000;
  width: 100%;
  padding: 30px 0px 30px 60px;
  @media (max-width:768px) {
    padding: 30px 20px;
  }
`;

export const AccountTitle = styled.div`
  font-size: 32px;
`;

export const AccountSubTitle = styled.div`
  margin-bottom: 24px;
`;

export const FormWrap = styled.div`
  width: 100%;
`;


export const InputWrap = styled.div`
border: 1px solid #f4f4f4;
padding: 12px;
border-radius: 5px;
margin-bottom: 16px;
input {
  border: none;
  width: 100%;
}
`;

export const ChamberInputWrap = styled.div`
  display: flex;
  align-items: center;
  div {
    padding-right: 5px;
    color: #707070;
  }
  input {
    border: none;
  }
`;
export const CheckboxWrap = styled.div`
  margin-right: 5px;
`;
