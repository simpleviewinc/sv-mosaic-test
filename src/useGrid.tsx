import { useCallback, useReducer, useEffect, useMemo, useState } from "react";
import { DataViewProps } from "@simpleview/sv-mosaic";

import reducer, { initialState, actions, loadData } from "./gridReducer";
import { useNavigate } from "react-router-dom";

const onSavedViewSave = () => {
  alert("Saving a view is not yet supported");
};

const onSavedViewRemove = () => {
  alert("Removing a view is not yet supported");
};

export default function useGrid(): DataViewProps {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const onBack = useCallback<NonNullable<DataViewProps["onBack"]>>(() => {
    navigate(-1);
  }, [navigate]);

  const onSavedViewChange = useCallback<
    NonNullable<DataViewProps["onSavedViewChange"]>
  >(
    (data) => {
      dispatch(actions.savedView(data));
    },
    [dispatch]
  );

  const onActiveFiltersChange = useCallback<
    NonNullable<DataViewProps["onActiveFiltersChange"]>
  >(
    ({ activeFilters, filter }) => {
      dispatch(actions.activeFilters({ activeFilters, filter }));
    },
    [dispatch]
  );

  const onLimitChange = useCallback<
    NonNullable<DataViewProps["onLimitChange"]>
  >(
    ({ limit }: { limit: number }) => {
      dispatch(actions.limit(limit));
    },
    [dispatch]
  );

  const onSkipChange = useCallback<NonNullable<DataViewProps["onSkipChange"]>>(
    ({ skip }: { skip: number }) => {
      dispatch(actions.skip(skip));
    },
    [dispatch]
  );

  const onSortChange = useCallback<NonNullable<DataViewProps["onSortChange"]>>(
    (sort) => {
      dispatch(actions.sort(sort));
    },
    [dispatch]
  );

  const onReorder = useCallback<NonNullable<DataViewProps["onReorder"]>>(
    (newRows) => {
      dispatch(actions.loading(true));
      const rowsSorted = newRows.map((id) => {
        return state.data.find((row) => row.id === id);
      });
      dispatch(
        actions.dataLoaded({ data: rowsSorted, count: rowsSorted.length })
      );
      dispatch(actions.loading(false));
    },
    [dispatch, state.data]
  );

  const onSavedViewGetOptions: NonNullable<
    DataViewProps["onSavedViewGetOptions"]
  > = () => {
    return state.views;
  };

  const additionalActions: DataViewProps["additionalActions"] = [
    {
      name: "more",
      label: "More",
      onClick: () => alert("clicked!")
    }
  ];

  const filters = useMemo<NonNullable<DataViewProps["filters"]>>(() => {
    const filters = (state.filters as any[]).map((val) => {
      return {
        name: val.name,
        label: val.label,
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
    dispatch(actions.loading(true));
    loadData(state).then((data) => {
      dispatch(actions.dataLoaded(data));
      dispatch(actions.loading(false));
    });
  }, [state.limit, state.skip, state.sort, state.filter, dispatch]);

  const [checkedState, setCheckedState] = useState<
    Pick<DataViewProps, "checked" | "checkedAllPages">
  >({
    checked: [],
    checkedAllPages: false
  });

  useEffect(() => {
    setCheckedState({
      ...checkedState,
      checked: state.data.map((val) => false)
    });
  }, [state.data]);

  return {
    title: "DataView Test",
    checked: checkedState.checked,
    checkedAllPages: checkedState.checkedAllPages,
    onCheckChange: (checked) => {
      setCheckedState((prev) => ({
        ...prev,
        checked
      }));
    },
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
    loading: state.loading,
    primaryActions: state.primaryActions,
    //@ts-expect-error
    views: state.views,
    savedView: state.savedView,
    additionalActions,
    onLimitChange,
    onSkipChange,
    onSortChange,
    onActiveFiltersChange,
    onSavedViewChange,
    onSavedViewSave,
    onSavedViewGetOptions,
    onSavedViewRemove,
    onReorder,
    onBack
  };
}
