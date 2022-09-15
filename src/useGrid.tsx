import { useCallback, useReducer, useEffect } from "react";
import { DataViewProps } from "@simpleview/sv-mosaic";

import reducer, { initialState, actions, loadData } from "./gridReducer";

const onSavedViewSave = () => {
  alert("Saving a view is not yet supported");
};

const onSavedViewRemove = () => {
  alert("Removing a view is not yet supported");
};

export default function useGrid(): DataViewProps {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSavedViewChange = useCallback(
    (data) => {
      dispatch(actions.savedView(data));
    },
    [dispatch]
  );

  const onActiveFiltersChange = useCallback(
    ({ activeFilters, filter }) => {
      console.log({ activeFilters, filter });
      dispatch(actions.activeFilters({ activeFilters, filter }));
    },
    [dispatch]
  );

  const onLimitChange: DataViewProps["onLimitChange"] = useCallback(
    ({ limit }: { limit: number }) => {
      dispatch(actions.limit(limit));
    },
    [dispatch]
  );

  const onSkipChange: DataViewProps["onSkipChange"] = useCallback(
    ({ skip }: { skip: number }) => {
      dispatch(actions.skip(skip));
    },
    [dispatch]
  );

  const onSortChange: DataViewProps["onSortChange"] = useCallback(
    (sort: DataViewSort) => {
      dispatch(actions.sort(sort));
    },
    [dispatch]
  );

  const onSavedViewGetOptions = () => {
    return state.views;
  };

  useEffect(() => {
    console.log("CALLED");
    loadData(state).then((data) => {
      dispatch(actions.dataLoaded(data));
    });
  }, [dispatch, state.limit, state.skip, state.sort]);

  return {
    title: "DataView Test",
    count: state.count,
    limit: state.limit,
    skip: state.skip,
    sort: state.sort,
    buttons: state.buttons,
    columns: state.columns,
    activeColumns: state.activeColumns,
    filters: state.filters,
    activeFilters: state.activeFilters,
    filter: {},
    data: state.data,
    primaryActions: state.primaryActions,
    views: state.views,
    savedView: state.savedView,
    onLimitChange,
    onSkipChange,
    onSortChange,
    onActiveFiltersChange,
    onSavedViewChange,
    onSavedViewSave,
    onSavedViewGetOptions,
    onSavedViewRemove
  };
}
