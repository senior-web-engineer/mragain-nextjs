import styled from "styled-components";

export const RowWrapper = styled.div`
  display: flex;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

export const TransferWrapper = styled.div`
  padding: 16px;
  border-left: 1px solid lightgray;
`;

export const MenuWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  padding: 16px;
  color: #909090;
  font-size: 12px !important;
  overflow: auto;

  .ant-tree > li {
    position: relative;
    padding: 13px 0 11px 0 !important;

    span:hover {
      background-color: transparent;
    }
  }
  .ant-tree-switcher {
    position: absolute !important;
    width: 100% !important;
    height: 38px !important;

    span {
      position: absolute !important;
      top: 8px !important;
      right: 0 !important;
    }
  }

  .ant-tree-icon__customize {
    margin-right: 10px !important;
  }

  .ant-tree > li > span:first-child {
    position: absolute;
    right: 0;
  }

  .ant-tree > li > ul {
    padding: 14px 0 0 16px;
  }
  .ant-tree > li > ul > li {
    border-left: solid 2px #e0e0e0;
    padding: 13px 0 11px 15px !important;
  }

  .ant-tree > li.ant-tree-treenode-selected {
    background: rgb(251, 191, 36);
    background: linear-gradient(
      0deg,
      rgba(251, 191, 36, 0) calc(100% - 50px),
      rgba(240, 255, 249, 1) calc(100% - 50px),
      rgba(240, 255, 249, 1) 50px
    );
    border-left: none !important;
  }

  .ant-tree-treenode-selected {
    border-left: solid 2px #06c987 !important;
  }
  .ant-tree-node-selected {
    background-color: transparent !important;
    color: black !important;
  }

  .ant-tree-switcher-noop {
    display: none !important;
  }
`;
