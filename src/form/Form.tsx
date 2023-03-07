import { Form as MosaicForm, FormProps } from "@simpleview/sv-mosaic";
import MatrixDrawer from "../matrix/MatrixDrawer";
import useBaseForm from "./useBaseForm";
import drawerReducer, {
  actions as drawerActions
} from "../drawers/drawersReducer";
import { useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  // we need use drawer for testing the Matrix field
  const [state, dispatch] = useReducer(drawerReducer, { drawers: [] });
  const navigate = useNavigate();

  const closeDrawer = useCallback(() => dispatch(drawerActions.closeDrawer()), [
    dispatch
  ]);
  const openDrawer = useCallback(
    ({ name, type }) => dispatch(drawerActions.newDrawer({ type, name })),
    [dispatch]
  );

  const onBack = useCallback<NonNullable<FormProps["onBack"]>>(() => {
      navigate(-1);
  }, [navigate]);

  const args = useBaseForm({ openDrawer, onBack });

  return (
    <>
      <MatrixDrawer
        drawers={state.drawers}
        state={args.state}
        dispatch={args.dispatch}
        closeDrawer={closeDrawer}
      />
      <MosaicForm {...args} />
    </>
  );
}
