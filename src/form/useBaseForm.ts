import { FormProps, useForm, formActions } from "@simpleview/sv-mosaic";
import getMatrixDataView from "../matrix/MatrixGridConfig";
import { useMemo } from "react";
import { v4 as uuidV4 } from 'uuid';

async function submit(dispatch: any) {
  const { data } = await dispatch(formActions.submitForm());
  console.log(data);
}

export default function useBaseForm({
  openDrawer
}: {
  openDrawer?: ({ name, type }: { name: string; type: string }) => void;
} = {}): FormProps {
  const { state, dispatch } = useForm();

  console.log({ state });

  function onSubmit() {
    return submit(dispatch);
  }

  const formMatrixDataView = useMemo(
    () => getMatrixDataView({ data: state.data.formMatrix }),
    [state.data.formMatrix]
  );

  const gridMatrixDataView = useMemo(
    () => getMatrixDataView({ data: state.data.gridMatrix }),
    [state.data.gridMatrix]
  );

  const fields: FormProps["fields"] = [
    {
      name: "formMatrix",
      type: "matrix",
      inputSettings: {
        dataView: formMatrixDataView,
        buttons: [
          {
            label: "Add (Form Matrix)",
            onClick: () => openDrawer?.({ name: "test", type: "form" }),
            color: "teal",
            variant: "text"
          }
        ]
      }
    },
    {
      name: "gridMatrix",
      type: "matrix",
      inputSettings: {
        dataView: gridMatrixDataView,
        buttons: [
          {
            label: "Add (Grid Matrix)",
            onClick: () => openDrawer?.({ name: "test", type: "grid" }),
            color: "teal",
            variant: "text"
          }
        ]
      }
    },
    {
      name: "foo",
      label: "Foo",
      type: "text"
    },
    {
      name: "bar",
      label: "Bar",
      type: "text",
      defaultValue: "Set value if getFormValues is not defined"
    },
    {
      name: "textArea",
      label: "Text Area",
      type: "text",
      inputSettings: {
        multiline: true,
        minRows: 2,
        maxRows: 4
      }
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
        googleMapsApiKey: "AIzaSyArV4f-KFF86Zn9VWAu9wS4hHlG1TXxqac",
        address: {},
        mapPosition: {
          lat: 0,
          lng: 0
        }
      }
    },
    {
      name: "addresses",
      label: "Addresses",
      type: "address",
      inputSettings: {
        googleMapsApiKey: "AIzaSyArV4f-KFF86Zn9VWAu9wS4hHlG1TXxqac",
        getOptionsCountries: () => [{ label: "United States", value: "US" }],
        getOptionsStates: () => [{ label: "Arizona", value: "AZ" }]
      }
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
            label: "Checkbox 3",
            value: "ch3"
          }
        ]
      }
    },
    {
      name: "advanced_selection",
      label: "Advanced Selection",
      type: "advancedSelection",
      inputSettings: {
        selectLimit: 2,
        createNewOption: (value) => ({
          label: `Option ${value}`,
          value: `option-${value}`
        }),
        options: [
          {
            label: "Option 1",
            value: "option-1"
          },
          {
            label: "Option 2",
            value: "option-2"
          },
          {
            label: "Option 3",
            value: "option-3"
          },
          {
            label: "Option 4",
            value: "option-4"
          },
          {
            label: "Option 5",
            value: "option-5"
          },
          {
            label: "Option 6",
            value: "option-6"
          },
          {
            label: "Option 7",
            value: "option-7"
          },
          {
            label: "Option 8",
            value: "option-8"
          },
          {
            label: "Option 9",
            value: "option-9"
          },
          {
            label: "Option 10",
            value: "option-10"
          }
        ]
      }
    },
    {
      name: "upload",
      label: "Upload",
      type: "upload",
      inputSettings: {
        onFileAdd: async ({ file, onChunkComplete, onUploadComplete, onError }) => {
          for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(() =>
                resolve(
                    onChunkComplete({ percent: (i + 1) * 0.1 })
                ), 300)
            );
          }

          if (Math.random() < 0.3) {
            await onError("File size exceeded");
            return;
          }

          const uploadData: Parameters<typeof onUploadComplete>[0] = {
            id: uuidV4(),
            name: file.name,
            size: `${file.size} bytes`,
            url: URL.createObjectURL(file)
          };

          await onUploadComplete(uploadData);

          alert(`Upload complete - uploadData: ${JSON.stringify(uploadData, null, 3)}`);
        },
        onFileDelete: ({ id }) => {
          alert(`DELETED FILE: ${id}`);
        },
        limit: 2
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
