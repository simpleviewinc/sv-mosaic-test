import {
  DataViewProps,
  DataViewFilterText,
  DataViewFilterSingleSelect,
  DataViewFilterMultiselect,
  DataViewFilterDate,
  MosaicLabelValue
} from "@simpleview/sv-mosaic";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import localStorageDB from "localstoragedb";
const database = new localStorageDB("new_docs", localStorage);

/**
 * REDUCER AND ACTIONS
 */
export default function reducer(state, action) {
  switch (action.type) {
    case "DATA_LOADED": {
      return {
        ...state,
        data: action.data,
        count: action.count
      };
    }
    case "SAVED_VIEW": {
      return {
        ...state,
        savedView: action.key,
        ...action.key?.state
      };
    }
    case "ACTIVE_FILTERS": {
      return {
        ...state,
        activeFilters: action.activeFilters,
        filter: action.filter
      };
    }
    case "FILTER": {
      const filter = {
        ...state.filter,
        [action.name]: action.value
      };

      return {
        ...state,
        filter,
        skip: 0
      };
    }
    case "LIMIT": {
      return {
        ...state,
        limit: action.key,
        skip: 0
      };
    }
    case "SKIP": {
      return {
        ...state,
        skip: action.key
      };
    }
    case "SORT": {
      return {
        ...state,
        sort: action.key,
        skip: 0
      };
    }
    case "LOADING": {
      return {
        ...state,
        loading: action.key
      };
    }
    default: {
      throw new Error("Action does not exist");
    }
  }
}

function dynamicSort(sortObj) {
  const { name: column, dir } = sortObj;

  let sortOrder = 1;
  if (dir === "desc") {
    sortOrder = -1;
  }
  return function (a, b) {
    const result = a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
    return result * sortOrder;
  };
}

export async function loadData({ limit, skip, sort, filter }) {
  const data = database.query("data");
  let result;
  result = data.sort(dynamicSort(sort));

  // Filters
  if (filter.foo) {
    result = result.filter((r) => r.foo === filter.foo.value);
  }
  if (filter.boolean) {
    if (filter.boolean.value) {
      result = result.filter((r) => r.boolean === filter.boolean.value);
    }
  }
  if (filter.date) {
    const startDate = filter.date.rangeStart
      ? filter.date.rangeStart.toISOString()
      : filter.date.rangeStart;
    const endDate = filter.date.rangeEnd
      ? filter.date.rangeEnd.toISOString()
      : filter.date.rangeEnd;
    if (startDate && endDate) {
      result = result.filter((r) => {
        return r.date >= startDate && r.date <= endDate;
      });
    } else if (startDate && !endDate) {
      result = result.filter((r) => {
        return r.date >= startDate;
      });
    } else if (!startDate && endDate) {
      result = result.filter((r) => {
        return r.date <= endDate;
      });
    }
  }
  if (filter.bar) {
    if (filter.bar.value.length !== 0) {
      const newResult = [];
      for (let index = 0; index < filter.bar.value.length; index++) {
        const filterResult = result.filter(
          (r) => r.bar === filter.bar.value[index]
        );
        //@ts-expect-error
        newResult.push(...filterResult);
      }
      result = newResult;
    }
  }

  result = result.slice(skip, skip + limit);
  return {
    data: result,
    count: data.length
  };
}

function dataLoaded({ data, count }) {
  return {
    type: "DATA_LOADED",
    data,
    count
  };
}

function savedViewAction(savedView: DataViewProps["savedView"]) {
  return {
    type: "SAVED_VIEW",
    key: savedView
  };
}

function activeFiltersAction({ activeFilters, filter }) {
  return {
    type: "ACTIVE_FILTERS",
    activeFilters,
    filter
  };
}

function filterAction({ name, value }) {
  return {
    type: "FILTER",
    name,
    value
  };
}

function limit(limit: number) {
  return {
    type: "LIMIT",
    key: limit
  };
}

function skip(skip: number) {
  return {
    type: "SKIP",
    key: skip
  };
}

function sort(sort) {
  return {
    type: "SORT",
    key: sort
  };
}

function loading(loading: boolean) {
	return {
		type: "LOADING",
		key: loading
	};
}

export const actions = {
  loadData,
  loading,
  dataLoaded,
  savedView: savedViewAction,
  activeFilters: activeFiltersAction,
  filter: filterAction,
  limit,
  skip,
  sort
};

/**
 *  INITIAL STATE
 */
const onClick = () => {
  alert("Click");
};

const onClickCreate = () => {
  alert("Click");
  //alert("Creating Dummy Record");
  //database.insert("data", { id: 40, foo: "Testing Create" });
};

const singleSelectOptions = [
  {
    label: "Yes",
    value: "true"
  },
  {
    label: "No",
    value: "false"
  }
];

const getSingleSelectOptions = () => {
  return {
    docs: singleSelectOptions,
    hasMore: false
  };
};

const getSingleSelectSelected = (id) => {
  return singleSelectOptions.filter((val) => val.value === id)[0];
};

const multiSelectOptions: MosaicLabelValue[] = [];
for (let index = 1; index < 16; index++) {
  multiSelectOptions.push({
    label: `Example ${index}`,
    value: `Example ${index}`
  });
}

const getMultiSelectOptions = () => {
  return {
    docs: multiSelectOptions,
    hasMore: false
  };
};

const getMultiSelectSelected = (ids) => {
  if (ids.length === 0) {
    return [];
  }

  const selectedOptions = [];
  for (let index = 0; index < ids.length; index++) {
    const selectOption = multiSelectOptions.find(
      (val) => val.value === ids[index]
    );
    //@ts-expect-error
    selectedOptions.push(selectOption);
  }
  return selectedOptions;
};

const columns: DataViewProps["columns"] = [
  {
    name: "id",
    label: "ID",
    sortable: true
  },
  {
    name: "foo",
    label: "Foo",
    sortable: true
  },
  {
    name: "bar",
    label: "Bar"
  },
  {
    name: "date",
    label: "Date"
  },
  {
    name: "boolean",
    label: "Boolean"
  }
];

const buttons: DataViewProps["buttons"] = [
  {
    name: "create",
    label: "Create",
    color: "yellow",
    variant: "contained",
    mIcon: Add,
    onClick: onClickCreate
  }
];

const primaryActions: DataViewProps["primaryActions"] = [
  {
    name: "edit",
    label: "Edit",
    mIcon: Edit,
    variant: "icon",
    onClick,
    color: "blue"
  },
  {
    name: "delete",
    label: "Delete",
    mIcon: Delete,
    variant: "icon",
    onClick,
    color: "red"
  }
];

const views: DataViewProps["savedView"][] = [
  {
    id: "1",
    label: "Saved View 1",
    type: "default",
    //@ts-ignore
    state: {
      limit: 10,
      skip: 0,
      activeColumns: ["id", "foo"]
    }
  },
  {
    id: "2",
    label: "Saved View 2",
    type: "default",
    //@ts-ignore
    state: {
      limit: 15,
      skip: 0,
      activeColumns: ["id", "foo", "date"]
    }
  },
  {
    id: "3",
    label: "All columns",
    type: "default",
    //@ts-ignore
    state: {
      limit: 5,
      skip: 0,
      activeColumns: columns.map((c) => c.name)
    }
  }
];

const savedView = views[2];

// omit onChange because they get added in useGrid hook
const filters: Omit<DataViewProps["filters"], "onChange"> = [
  {
    name: "foo",
    label: "Foo",
    component: DataViewFilterText
  },
  {
    name: "date",
    label: "Date",
    component: DataViewFilterDate,
    args: {
      options: [{ label: "Last 30 Days", value: "last-30" }]
    }
  },
  {
    name: "boolean",
    label: "Boolean",
    component: DataViewFilterSingleSelect,
    args: {
      getSelected: getSingleSelectSelected,
      getOptions: getSingleSelectOptions
    }
  },
  {
    name: "bar",
    label: "Bar",
    component: DataViewFilterMultiselect,
    args: {
      getSelected: getMultiSelectSelected,
      getOptions: getMultiSelectOptions
    }
  }
];

export const initialState = {
  limit: 25,
  skip: 0,
  data: [],
  loading: true,
  count: 0,
  columns,
  activeColumns: columns.map((c) => c.name),
  sort: {
    name: "foo",
    dir: "asc"
  },
  filter: {},
  filters,
  activeFilters: ["foo", "date"],
  buttons,
  primaryActions,
  views,
  savedView,
  //@ts-expect-error
  ...savedView.state
};
