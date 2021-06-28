import './styles.less';
import { Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

const MultiSelectWrapper = styled.div`
    .ant-select-selection--multiple {
        padding: 16px;
    }
    .ant-select-selection--multiple .ant-select-selection__choice {
        border-radius: 16px;
        height: 32px;
        margin: 0;
        margin-right: 16px;
        background: #F0FFF9;
        border-color: #F0FFF9;
        color: #06C987;
    }
    .ant-select-selection--multiple .ant-select-selection__choice__disabled {
        position: absolute;
        right: 0;
        background: #F3F3F3;
        border-color: #F3F3F3;
        color: inherit;
    }

    .ant-select-selection__choice__content {
        margin-right: 16px;
    }

    .ant-select-arrow {
        top: calc(50% - 4px) !important;

        svg {
            width: 1.1rem !important;
            height: 1.1rem !important;
        }
    }
`

export const MultiSelect = ({
    placeholder,
    onChange,
    value,
    options,
}) => {
    const renderChildren = (optionItems) => {
        const children = [];
        optionItems.forEach((option) => {
            children.push(<Option key={option.value}>{option.label}</Option>);
        });
        return children;
    }

    return (
        <MultiSelectWrapper>
            <Select
                mode="multiple"
                maxTagCount={3}
                size="large"
                showArrow
                defaultValue={value}
                style={{ width: "100%" }}
                placeholder={placeholder || 'Select item'}
                onChange={onChange}
                tokenSeparators={[","]}
            >
                {renderChildren(options)}
            </Select>
        </MultiSelectWrapper>
    );
};
