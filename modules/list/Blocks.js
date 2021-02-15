import Loader from "@/components/common/Loader";
import React, { useMemo } from "react";
import { useListContext } from ".";

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

export function LoadMore() {
  const { state, actions } = useListContext();

  if (state.isLoading) {
    return null;
  }

  return <button onClick={actions.nextPage}>Load more</button>;
}
