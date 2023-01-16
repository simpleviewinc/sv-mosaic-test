import { Form as MosaicForm } from "@simpleview/sv-mosaic";
import MatrixDrawer from "../matrix/MatrixDrawer";
import useBaseForm from "./useBaseForm";
import drawerReducer, {
  actions as drawerActions
} from "../drawers/drawersReducer";
import { useReducer, useCallback } from "react";

export default function Form() {
  // we need use drawer for testing the Matrix field
  const [state, dispatch] = useReducer(drawerReducer, { drawers: [] });
  const closeDrawer = useCallback(() => dispatch(drawerActions.closeDrawer()), [
    dispatch
  ]);
  const openDrawer = useCallback(
    ({ name, type }) => dispatch(drawerActions.newDrawer({ type, name })),
    [dispatch]
  );

  const args = useBaseForm({ openDrawer });

  return (
    <>
      <MatrixDrawer
        drawers={state.drawers}
        state={args.state}
        dispatch={args.dispatch}
        closeDrawer={closeDrawer}
      />
      <MosaicForm {...args} />;
    </>
  );
}
