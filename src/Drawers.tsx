import { useReducer, useCallback, useMemo } from "react";
import { Drawers as MosaicDrawers, Button } from "@simpleview/sv-mosaic";

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
  return (
    <div className="drawerContent--container">
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

  const drawers = useMemo(() => {
    return state.drawers.map((drawer) => {
      return (
        <DrawerContent
          key={drawer.id}
          id={drawer.id}
          name={drawer.name}
          onAddNewDrawer={onAddNewDrawer}
          onCloseDrawer={onCloseDrawer}
        />
      );
    });
  }, [state, onAddNewDrawer, onCloseDrawer]);

  console.log(state);

  return (
    <div className="drawersPage--container">
      <div>
        <OpenDrawerBtn onAddNewDrawer={onAddNewDrawer} />
      </div>
      <MosaicDrawers drawers={drawers} />
    </div>
  );
}
