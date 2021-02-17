import { createContext, useContext } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { debounce } from "lodash";
import isEqual from "fast-deep-equal";
import { createSelector } from "reselect";
import { store } from "@/configureStore";

export function createListModule({ fetchData, getInitialQuery, guid = uuid() } = {}) {
  function getModuleState(state) {
    return state.list?.[guid];
  }

  const getItems = createSelector(getModuleState, (moduleState) => {
    const { pages, items } = moduleState;

    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page]);
    }, []);
  });

  const getQuery = createSelector(getModuleState, (moduleState) => {
    const page = moduleState.currentPage;
    const filters = moduleState.filters;

    return {
      ...filters,
      offset: page * filters?.limit,
    };
  });

  function fetchItems() {
    const query = getQuery(store.ref.getState());
    store.ref.dispatch({
      type: "FETCH_LIST_DATA",
      guid,
      promise: fetchData(query),
    });
  }

  const debouncedFetchItems = debounce(fetchItems, 1000);

  return {
    guid,
    actions: {
      initialize() {
        const query = getInitialQuery?.();
        store.ref.dispatch({
          type: "INITIALIZE_LIST",
          guid,
          promise: fetchData(query),
          query,
        });
      },
      nextPage() {
        store.ref.dispatch({ type: "NEXT_PAGE", guid });
        fetchItems();
      },
      updateQuery(filters) {
        const moduleState = getModuleState(store.ref.getState())
        if (isEqual(filters, moduleState.filters)) {
          return;
        }

        store.ref.dispatch({ type: "UPDATE_LIST_QUERY", guid, filters });
        debouncedFetchItems();
      },
    },
    selectors: {
      getItems,
      getQuery,
    },
  };
}

const ListContext = createContext();

export function useListContext() {
  return useContext(ListContext);
}

const List = connect((state, ownProps) => ({
  moduleState: state.list?.[ownProps.module.guid],
}))(function ({ moduleState, module, children }) {
  if (!moduleState) {
    return null;
  }

  return (
    <ListContext.Provider
      value={{ state: moduleState, actions: module.actions }}
    >
      {children}
    </ListContext.Provider>
  );
});

export default List;
