import styled from "styled-components";

const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Loader() {
  return (
    <LoaderWrap>
      Loading...
    </LoaderWrap>
  )
}
