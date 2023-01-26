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

const gridVariantData = Array.from(Array(30)).map((_, idx) => ({
  title: "Row " + idx,
  description: "Description for row " + idx,
  target: false,
  created: new Date(Date.now()),
  updated: new Date(Date.now()),
  id: `${idx}`
}));

/** Drawer containing a data view */
function GridDrawerContent({ dispatch, onCloseDrawer }) {
  const [checkedRows, setCheckedRows] = useState(
    Array(gridVariantData.length).fill(false)
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

  const drawerGrid = useMemo<Parameters<typeof DataView>[0]>(
    () => ({
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
      onCheckChange: setCheckedRows,
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
