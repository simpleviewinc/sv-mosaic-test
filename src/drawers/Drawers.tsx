import { useReducer, useCallback } from "react";
import {
  Drawers as MosaicDrawers,
  Button,
  DrawerHeader,
} from "@simpleview/sv-mosaic";

import reducer, { actions } from "./drawersReducer";

function OpenDrawerBtn({ onAddNewDrawer }) {
  return (
    <Button
      color="blue"
      variant="contained"
      label="Open new drawer"
      onClick={onAddNewDrawer}
    />
  );
}

function DrawerContent({ name, id, onAddNewDrawer, onCloseDrawer }) {
  const buttons = [
    {
      name: "Red",
      onClick: onCloseDrawer,
      color: "red",
      variant: "contained",
      label: "Red Close"
    },
    {
      name: "Red",
      onClick: () => alert("This is an alert"),
      color: "blue",
      variant: "contained",
      label: "Blue Alert"
    }
  ];
  return (
    <div className="drawerContent--container">
      <DrawerHeader title="Header" onCancel={onCloseDrawer} buttons={buttons} />
      <h3>Drawer - {id}</h3>
      <p>Name: {name}</p>
      <OpenDrawerBtn onAddNewDrawer={onAddNewDrawer} />
      <Button
        color="yellow"
        variant="contained"
        label="Close drawer"
        onClick={onCloseDrawer}
      />
    </div>
  );
}

export default function Drawers() {
  const [state, dispatch] = useReducer(reducer, {
    drawers: []
  });

  const onAddNewDrawer = useCallback(() => {
    dispatch(
      actions.newDrawer({
        name: "new_drawer"
      })
    );
  }, [dispatch]);

  const onCloseDrawer = useCallback(() => {
    dispatch(actions.closeDrawer());
  }, [dispatch]);

  return (
    <div className="drawersPage--container">
      <div>
        <OpenDrawerBtn onAddNewDrawer={onAddNewDrawer} />
      </div>
      <MosaicDrawers drawers={state.drawers}>
        {(drawer: { id: string; name: string }) => (
          <DrawerContent
            id={drawer.id}
            name={drawer.name}
            onAddNewDrawer={onAddNewDrawer}
            onCloseDrawer={onCloseDrawer}
          />
        )}
      </MosaicDrawers>
    </div>
  );
}
