import Loader from "@/components/common/Loader";
import React, { useMemo } from "react";
import { useListContext } from ".";
import { Table as AntTable } from "antd";
import styled from "styled-components";

const StyledTable = styled(AntTable)`
  .ant-table-thead > tr > th {
    font-size: 12px;
    color: #c0c0c0;
    font-weight: 400;
    background-color: transparent;
    border-bottom: 0;
  }

  .ant-table-tbody {
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    tr td {
      border-bottom: 0;
    }
    tr:nth-child(2n) {
      background-color: #f8f8f8;
    }
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  margin: 40px auto;
  max-width: 500px;
`;

export function Listing({ Item }) {
  const { state } = useListContext();
  const { items, pages, currentPage, isLoading } = state;

  const derivedItems = useMemo(() => {
    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page]);
    }, []);
  }, [items, pages]);

  function renderItem(item) {
    return <Item item={item} />;
  }

  function renderLoader() {
    if (!isLoading) {
      return null;
    }

    return <Loader small={currentPage > 0} />;
  }

  return (
    <>
      {Item ? derivedItems.map(renderItem) : null}
      {renderLoader()}
    </>
  );
}

export function Table({ ...props }) {
  const { state, actions } = useListContext();
  const { items, pages, currentPage, isLoading } = state;
  const derivedItems = useMemo(() => {
    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page]);
    }, []);
  }, [items, pages]);

  return (
    <StyledTable pagination={false} {...props} dataSource={derivedItems} />
  );
}

export function LoadMore() {
  const { state, actions } = useListContext();

  if (state.isLoading) {
    return null;
  }

  return <button onClick={actions.nextPage}>Load more</button>;
}

export function NoResults({ message }) {
  const { items, state } = useListContext();

  if (state.isLoading) {
    return null;
  }

  if (items.length === 0) {
    return <NoResultsMessage>{message}</NoResultsMessage>;
  }

  return null;
}
