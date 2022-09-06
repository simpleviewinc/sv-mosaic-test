import { useCallback, useReducer } from "react";
import { DataViewProps } from "@simpleview/sv-mosaic";

import reducer, { initialState, actions } from "./gridReducer";

const onLimitChange = ({ limit }) => {
  alert(limit);
};

const onSkipChange = ({ skip }) => {
  alert(skip);
};

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

  const onSavedViewGetOptions = () => {
    return state.views;
  };

  return {
    title: "DataView Test",
    count: state.count,
    limit: state.limit,
    skip: state.skip,
    buttons: state.buttons,
    columns: state.columns,
    filters: state.filters,
    activeFilters: state.activeFilters,
    filter: {},
    data: state.data,
    primaryActions: state.primaryActions,
    views: state.views,
    savedView: state.savedView,
    onLimitChange,
    onSkipChange,
    onActiveFiltersChange,
    onSavedViewChange,
    onSavedViewSave,
    onSavedViewGetOptions,
    onSavedViewRemove
  };
}
