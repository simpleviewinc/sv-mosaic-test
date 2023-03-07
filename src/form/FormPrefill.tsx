import { Form as MosaicForm } from "@simpleview/sv-mosaic";
import { FieldDef } from "@simpleview/sv-mosaic/components/Field";
import { useCallback } from "react";

import useBaseForm from "./useBaseForm";

export default function Form() {
  const args = useBaseForm();

  args.getFormValues = useCallback(async function () {
    return {
      foo: "Foo Value",
      textArea: "Foo\nBar\nBaz\nFoo\nBar",
      number: 10,
      date_at: new Date(2020, 1, 1),
      coords: {
        lat: 32.22937555988414,
        lng: -110.94819886474133
      },
      addresses: [
        {
          address1: "Street Name",
          address2: "S Avenue",
          address3: "E Street",
          city: "Los Angeles",
          state: {
            label: "Arizona",
            value: "AZ"
          },
          postalCode: 12345,
          country: {
            label: "United States",
            value: "US"
          },
          types: [
            { label: "Physical", value: "physical" },
            { label: "Shipping", value: "shipping"}
          ]
        }
      ] as Extract<FieldDef, { type: "address" }>["defaultValue"],
      chip: {
        label: "Row 2",
        value: "v2"
      },
      dropdown: {
        label: "Option 2",
        value: "d2"
      },
      toggleSwitch: true,
      radio: {
        label: "Value 2",
        value: "r2"
      },
      checkbox: [
        {
          label: "Checkbox 1",
          value: "ch1"
        },
        {
          label: "Checkbox 3",
          value: "ch3"
        }
      ],
      advanced_selection: [
        {
          label: "Option 2",
          value: "option-2"
        },
        {
          label: "Option 6",
          value: "option-6"
        }
      ],
      number_table: {
        "2023_02_10": {
          single: "12",
          double: "13",
          queen: "14",
          king: "15",
          suite: "16",
          any: "17",
        },
        "2023_02_11": {
          single: "18",
          double: "19",
          queen: "20",
          king: "21",
          suite: "22",
          any: "23",
        },
        "2023_02_12": {
          single: "12",
          double: "13",
          queen: "14",
          king: null,
          suite: "16",
          any: "20",
        },
        "2023_02_13": {
          single: "1",
          double: "1",
          queen: "1",
          king: "1",
          suite: "1",
          any: "1",
        },
      }
    };
  }, []);

  return <MosaicForm {...args} />;
}
