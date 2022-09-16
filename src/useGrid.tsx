import { useCallback, useReducer, useEffect, useMemo } from "react";
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
    (sort) => {
      dispatch(actions.sort(sort));
    },
    [dispatch]
  );

  const onSavedViewGetOptions = () => {
    return state.views;
  };

  const filters = useMemo(() => {
    const filters = state.filters.map((val) => {
      return {
        name: val.name,
        label: val.label,
        type: val.type,
        args: val.args,
        component: val.component,
        onChange: (value) => {
          dispatch(actions.filter({ name: val.name, value }));
        }
      };
    });

    return filters;
  }, [state.filters, dispatch]);

  useEffect(() => {
    loadData(state).then((data) => {
      dispatch(actions.dataLoaded(data));
    });
  }, [state.limit, state.skip, state.sort, state.filter, dispatch]);

  return {
    title: "DataView Test",
    count: state.count,
    limit: state.limit,
    skip: state.skip,
    sort: state.sort,
    buttons: state.buttons,
    columns: state.columns,
    activeColumns: state.activeColumns,
    filters,
    activeFilters: state.activeFilters,
    filter: state.filter,
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
