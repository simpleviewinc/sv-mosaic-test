import { FormProps, useForm, formActions } from "@simpleview/sv-mosaic";

async function submit(dispatch: any) {
  const { data } = await dispatch(formActions.submitForm());
  console.log(data);
}

export default function useBaseForm(): FormProps {
  const { state, dispatch } = useForm();

  function onSubmit() {
    return submit(dispatch);
  }

  const fields: FormProps["fields"] = [
    {
      name: "foo",
      label: "Foo",
      type: "text"
    },
    {
      name: "textArea",
      label: "Text Area",
      type: "textArea"
    },
    {
      name: "number",
      label: "Number",
      type: "text",
      inputSettings: {
        type: "number"
      }
    },
    {
      name: "date_at",
      label: "Date",
      type: "date"
    },
    {
      name: "coords",
      label: "Coords",
      type: "mapCoordinates",
      inputSettings: {
        apiKey: "AIzaSyArV4f-KFF86Zn9VWAu9wS4hHlG1TXxqac"
      }
    },
    {
      name: "addresses",
      label: "Addresses",
      type: "address"
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
    },
    {
      name: "dropdown",
      label: "Dropdown",
      type: "dropdown",
      inputSettings: {
        placeholder: "Choose one option",
        options: [
          {
            label: "Option 1",
            value: "d1"
          },
          {
            label: "Option 2",
            value: "d2"
          }
        ]
      }
    },
    {
      name: "toggleSwitch",
      label: "Toggle Switch",
      type: "toggleSwitch",
      inputSettings: {
        toggleLabel: "Boolean"
      }
    },
    {
      name: "radio",
      label: "Radio",
      type: "radio",
      inputSettings: {
        options: [
          {
            label: "Value 1",
            value: "r1"
          },
          {
            label: "Value 2",
            value: "r2"
          }
        ]
      }
    },
    {
      name: "checkbox",
      label: "Checkbox",
      type: "checkbox",
      inputSettings: {
        options: [
          {
            label: "Checkbox 1",
            value: "ch1"
          },
          {
            label: "Checkbox 2",
            value: "ch2"
          },
          {
            label: "Checkbox 2",
            value: "ch3"
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
