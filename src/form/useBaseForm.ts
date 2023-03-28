import { FormProps, useForm, formActions } from "@simpleview/sv-mosaic";
import getMatrixDataView from "../matrix/MatrixGridConfig";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuidV4 } from 'uuid';

async function submit(dispatch: any) {
  const { data, valid } = await dispatch(formActions.submitForm());
  console.log('valid :>> ', valid);
  console.log('data :>> ', data);
}

export default function useBaseForm({
  openDrawer,
  onBack
}: {
  openDrawer?: ({ name, type }: { name: string; type: string }) => void;
  onBack?: FormProps["onBack"]
} = {}): FormProps {
  const { state, dispatch } = useForm();
  const [ disabled, setDisabled ] = useState(false);

  console.log({ state });

  function onSubmit() {
    return submit(dispatch);
  }

  const onClickToggleDisable = useCallback(() => {
    setDisabled(!disabled);
  }, [disabled])

  const formMatrixDataView = useMemo(
    () => getMatrixDataView({ data: state.data.formMatrix }),
    [state.data.formMatrix]
  );

  const gridMatrixDataView = useMemo(
    () => getMatrixDataView({ data: state.data.gridMatrix }),
    [state.data.gridMatrix]
  );

  const fields: FormProps["fields"] = useMemo(() => [
    {
      name: "formMatrix",
      type: "matrix",
      disabled,
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
      disabled,
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
      type: "text",
      disabled,
      inputSettings: {
        maxCharacters: 40
      }
    },
    {
      name: "bar",
      label: "Bar",
      type: "text",
      disabled,
      defaultValue: "Set value if getFormValues is not defined"
    },
    {
      name: "textArea",
      label: "Text Area",
      type: "text",
      disabled,
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
      disabled,
      inputSettings: {
        type: "number"
      }
    },
    {
      name: "date_at",
      label: "Date",
      type: "date",
      disabled
    },
    {
      name: "coords",
      label: "Coords",
      type: "mapCoordinates",
      disabled,
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
      disabled,
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
      disabled,
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
      disabled,
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
      disabled,
      inputSettings: {
        toggleLabel: "Boolean"
      }
    },
    {
      name: "radio",
      label: "Radio",
      type: "radio",
      disabled,
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
      disabled,
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
      disabled,
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
      name: "phone",
      label: "Phone",
      disabled,
      type: "phone"
    },
    {
      name: "upload",
      label: "Upload",
      type: "upload",
      disabled,
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
    },
    {
      name: "number_table",
      label: "Number table",
      type: "numberTable",
      required: true,
      disabled,
      inputSettings: {
        rowTotalLabel: "Total:",
        columnTotalLabel: "Nº Rooms",
        topLeftLabel: "Day",
        rows: [
          { name: "2023_02_10", title: "Shoulder Before" },
          { name: "2023_02_11", title: "Day 1", subtitle: "Thu, Feb 11 2023" },
          { name: "2023_02_12", title: "Day 2", subtitle: "Fri, Feb 12 2023" },
          { name: "2023_02_13", title: "Day 3", subtitle: "Sat, Feb 13 2023" }
        ],
        columns: [
          { name: "single", title: "Single" },
          { name: "double", title: "Double" },
          { name: "queen", title: "Queen" },
          { name: "king", title: "King" },
          { name: "suite", title: "Suite" },
          { name: "any", title: "Any" }
        ]
      }
    }
  ], [disabled]);

  const buttons: FormProps["buttons"] = [
    {
      name: "submit",
      label: "Save",
      onClick: onSubmit,
      color: "yellow",
      variant: "contained"
    },
    {
      name: "toggle_disable",
      label: "Toggle disable",
      onClick: onClickToggleDisable,
      color: "blue",
      variant: "contained"
    }
  ];

  const sections: FormProps["sections"] = useMemo(() => [
    {
      title: "Section 1",
      fields: [[["formMatrix"]], [["gridMatrix"]]]
    },
    {
      title: "Section 2",
      fields: [[["foo"]], [["bar"]], [["textArea"]], [["date_at"]]]
    },
    {
      title: "Section 3",
      fields: [[["coords"]], [["addresses"]]]
    },
    {
      title: "Section 4",
      fields: [
        [["chip"]],
        [["dropdown"]],
        [["toggleSwitch"]],
        [["radio"]],
        [["checkbox"]],
        [["advanced_selection"]],
        [["phone"]],
        [["upload"]],
        [["number_table"]],
      ]
    }
  ], []);

  return {
    title: "Form Title",
    state,
    dispatch,
    fields,
    buttons,
    sections,
    onBack
  };
}
