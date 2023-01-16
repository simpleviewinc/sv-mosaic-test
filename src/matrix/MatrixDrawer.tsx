import { useCallback, useMemo, useState } from "react";
import {
  Drawers as MosaicDrawers,
  Form as MosaicForm,
  formActions,
  DrawerHeader,
  DataView
} from "@simpleview/sv-mosaic";
import Delete from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";

/** Drawer containing a form */
function FormDrawerContent({ id, onCloseDrawer, state, dispatch }) {
  const onSave = useCallback(async () => {
    const nextRow = {
      id: id.toString(), // just using the drawer id, since it's always unique on every new drawer
      title: state.data.title,
      description: state.data.description
    };

    const matrixFieldValue = state.data.formMatrix?.length
      ? [...state.data.formMatrix, nextRow]
      : [nextRow];

    await dispatch(
      formActions.setFieldValue({
        name: "formMatrix",
        touched: true,
        value: matrixFieldValue
      })
    );
    await onCloseDrawer();
  }, [dispatch, state, id, onCloseDrawer]);

  return (
    <MosaicForm
      buttons={[
        {
          label: "Cancel",
          onClick: onCloseDrawer,
          color: "gray",
          variant: "outlined"
        },
        {
          label: "Save",
          onClick: onSave,
          color: "yellow",
          variant: "contained"
        }
      ]}
      title="Matrix Drawer Form"
      state={state}
      fields={[
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "some title default"
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          defaultValue: "some description default"
        }
      ]}
      dispatch={dispatch}
      type="drawer"
    />
  );
}

const gridVariantData = [
  {
    title: "Row 1",
    description: "Description for row 1",
    target: false,
    created: new Date(Date.now()),
    updated: new Date(Date.now()),
    id: "1"
  },
  {
    title: "Row 2",
    description: "Description for row 2",
    target: false,
    created: new Date(Date.now()),
    updated: new Date(Date.now()),
    id: "2"
  }
];

/** Drawer containing a data view */
function GridDrawerContent({ id, state, dispatch, onCloseDrawer }) {
  const [checkedRows, setCheckedRows] = useState(
    gridVariantData.map(() => false)
  );

  const onSave = useCallback(async () => {
    const selectedRows = checkedRows
      .map((checked, idx) => checked && gridVariantData[idx])
      .filter(Boolean);

    await dispatch(
      formActions.setFieldValue({
        name: "gridMatrix",
        value: selectedRows,
        touched: true
      })
    );

    await onCloseDrawer();
  }, [dispatch, checkedRows, onCloseDrawer]);

  const drawerGrid = useMemo(
    () => ({
      limit: 25,
      display: "list",
      activeColumns: ["id", "title", "description"],
      checked: checkedRows,
      columns: [
        {
          name: "id",
          label: "ID"
        },
        {
          name: "description",
          label: "Description"
        },
        {
          name: "title",
          label: "Title"
        }
      ],
      onCheckChange: (checked) => setCheckedRows(checked),
      primaryActions: [
        {
          name: "delete",
          color: "black",
          variant: "icon",
          mIcon: Delete,
          onClick: async ({ data }) => {
            alert("Clicked: " + data.id);
          }
        }
      ],
      bulkActions: [
        {
          name: "download",
          color: "black",
          variant: "icon",
          mIcon: GetAppIcon,
          onClick: function ({ data }) {
            alert(`DOWNLOAD ${data.map((val) => val.id)}`);
          }
        }
      ],
      sticky: true,
      data: gridVariantData
    }),
    [checkedRows]
  );

  return (
    <>
      <DrawerHeader
        title="Matrix Grid Variant"
        buttons={[
          {
            label: "Cancel",
            onClick: onCloseDrawer,
            color: "gray",
            variant: "outlined"
          },
          {
            label: "Save",
            onClick: onSave,
            color: "yellow",
            variant: "contained"
          }
        ]}
      />
      <DataView {...drawerGrid} />
    </>
  );
}

/**
 * @param state - form state
 */
export default function MatrixFormDrawer({
  drawers,
  closeDrawer,
  state,
  dispatch
}) {
  return (
    <MosaicDrawers drawers={drawers}>
      {(drawer: { id: string; name: string; type: string }) => {
        const DrawerComp =
          drawer.type === "form" ? FormDrawerContent : GridDrawerContent;
        return (
          <DrawerComp
            id={drawer.id}
            onCloseDrawer={closeDrawer}
            state={state}
            dispatch={dispatch}
          />
        );
      }}
    </MosaicDrawers>
  );
}
