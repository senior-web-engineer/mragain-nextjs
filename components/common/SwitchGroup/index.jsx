import { Switch } from 'antd';
import styled from 'styled-components';

const SwitchGroupWrapper = styled.div`
    display: flex;
    align-items: center;

    div {
        margin-left: 10px;

        h4 {
            margin-bottom: 2px;
        }

        p {
            margin: 0;
        }
    }
`

export const SwitchGroup = ({ title, description, ...rest }) => (
    <SwitchGroupWrapper>
        <Switch {...rest} />
        <div>
            <h4><b>{title}</b></h4>
            <p>{description}</p>
        </div>
    </SwitchGroupWrapper>
)