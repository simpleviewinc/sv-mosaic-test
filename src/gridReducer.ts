import {
  DataViewProps,
  MosaicObject,
  DataViewFilterText,
  DataViewFilterSingleSelect,
  DataViewFilterMultiselect,
  DataViewFilterDate
} from "@simpleview/sv-mosaic";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

/**
 * REDUCER AND ACTIONS
 */
export default function reducer(state, action) {
  switch (action.type) {
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
    default: {
      throw new Error("Action does not exist");
    }
  }
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

export const actions = {
  savedView: savedViewAction,
  activeFilters: activeFiltersAction
};

/**
 *  INITIAL STATE
 */

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

const data: MosaicObject = [];
for (let i = 0; i < 50; i++) {
  data.push({
    foo: `Foo ${i}`,
    bar: `Bar ${i}`,
    number: `${i}`,
    date: randomDate(new Date(2012, 0, 1), new Date()),
    boolean: Math.random() < 0.5
  });
}

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
    name: "foo",
    label: "Foo"
  },
  {
    name: "bar",
    label: "Bar"
  },
  {
    name: "number",
    label: "Number"
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
      activeColimns: ["foo", "number"]
    }
  },
  {
    id: "2",
    label: "Saved View 2",
    type: "default",
    state: {
      limit: 15,
      skip: 0,
      activeColimns: ["foo", "number", "date"]
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
    component: DataViewFilterSingleSelect,
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
  data,
  count: data.length,
  columns,
  filters,
  activeFilters: [],
  buttons,
  primaryActions,
  views,
  savedView,
  ...savedView.state
};
