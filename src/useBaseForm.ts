import { FormProps, useForm } from "@simpleview/sv-mosaic";

function onSubmit(data) {
  console.log(data);
}

export default function useBaseForm(): FormProps {
  const { state, dispatch, registerFields, registerOnSubmit } = useForm();

  const fields = [
    {
      name: "foo",
      label: "Foo",
      type: "text"
    },
    {
      name: "date_at",
      label: "Date",
      type: "date"
    }
  ];

  registerFields(fields);
  registerOnSubmit(onSubmit);

  return {
    title: "Form Title",
    state,
    dispatch,
    fields
  };
}
