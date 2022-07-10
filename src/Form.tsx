import { Form as MosaicForm } from "@simpleview/sv-mosaic";

import useBaseForm from "./useBaseForm";

export default function Form() {
  const args = useBaseForm();

  return <MosaicForm {...args} />;
}
