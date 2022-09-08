import {
  DataViewProps,
  MosaicObject,
  DataViewFilterText,
  DataViewFilterDropdown,
  DataViewFilterMultiselect,
  DataViewFilterDate
} from "@simpleview/sv-mosaic";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import { db } from "../db";

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

export async function loadData({ limit, skip, sort }) {
  const data = structuredClone(db);
  let result;
  result = data.sort(dynamicSort(sort));
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

export const actions = {
  loadData,
  dataLoaded,
  savedView: savedViewAction,
  activeFilters: activeFiltersAction,
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

const onChange = () => {
  alert("Change");
};

const getOptions = () => {
  return {
    docs: [
      {
        label: "Yes",
        value: "true"
      },
      {
        label: "No",
        value: "false"
      }
    ],
    hasMore: false
  };
};

const getSelected = () => {
  console.log("getSelected");
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
    onClick
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
    state: {
      limit: 5,
      skip: 0,
      activeColumns: columns.map((c) => c.name)
    }
  }
];

const savedView = views[0];

const filters: DataViewProps["filters"] = [
  {
    name: "foo",
    label: "Foo",
    component: DataViewFilterText,
    type: "primary",
    onChange
  },
  {
    name: "date",
    label: "Date",
    component: DataViewFilterDate,
    type: "primary",
    onChange
  },
  {
    name: "boolean",
    label: "Boolean",
    component: DataViewFilterDropdown,
    type: "optional",
    onChange,
    args: {
      getSelected,
      getOptions
    }
  }
  // {
  //   name: "bar",
  //   label: "Bar",
  //   component: DataViewFilterMultiselect,
  //   type: "optional",
  //   onChange,
  //   args: {
  //     getSelected,
  //     getOptions
  //   }
  // }
];

export const initialState = {
  limit: 25,
  skip: 0,
  data: [],
  count: 0,
  columns,
  activeColumns: columns.map((c) => c.name),
  sort: {
    name: "id",
    dir: "asc"
  },
  filters,
  activeFilters: [],
  buttons,
  primaryActions,
  views,
  savedView,
  ...savedView.state
};
