import { Form as MosaicForm } from "@simpleview/sv-mosaic";
import { useCallback } from "react";

import useBaseForm from "./useBaseForm";

export default function Form() {
  const args = useBaseForm();

  args.getFormValues = useCallback(async function () {
    console.log("called");
    return {
      foo: "Foo Value",
      date_at: new Date(2020, 1, 1),
      chip: "v2"
    };
  }, []);

  return <MosaicForm {...args} />;
}
