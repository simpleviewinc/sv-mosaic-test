import { FormProps, useForm } from "@simpleview/sv-mosaic";

function onSubmit(data) {
  console.log(data);
}

export default function useBaseForm(): FormProps {
  const { state, dispatch } = useForm();

  const fields: FormProps["fields"] = [
    {
      name: "foo",
      label: "Foo",
      type: "text"
    },
    {
      name: "date_at",
      label: "Date",
      type: "date"
    },
    {
      name: "coords",
      label: "Coords",
      type: "mapCoordinates"
    },
    {
      name: "chip",
      label: "Chip",
      type: "chip",
      inputSettings: {
        options: [
          {
            label: "Row 1",
            value: "v1"
          },
          {
            label: "Row 2",
            value: "v2"
          }
        ]
      }
    }
  ];

  const buttons: FormProps["buttons"] = [
    {
      name: "submit",
      label: "Save",
      onClick: onSubmit,
      color: "yellow",
      variant: "contained"
    }
  ];

  return {
    title: "Form Title",
    state,
    dispatch,
    fields,
    buttons
  };
}
