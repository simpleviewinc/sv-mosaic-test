import { Form as MosaicForm } from "@simpleview/sv-mosaic";
import { useCallback } from "react";

import useBaseForm from "./useBaseForm";

export default function Form() {
  const args = useBaseForm();

  args.getFormValues = useCallback(async function () {
    return {
      foo: "Foo Value",
      textArea: "Bar value",
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
          state: "CA",
          postalCode: 12345,
          country: "US",
          types: ["physical", "billing", "shipping"]
        }
      ],
      chip: "v2",
      dropdown: "d2",
      toggleSwitch: true,
      radio: "r2",
      checkbox: ["ch1", "ch3"]
    };
  }, []);

  return <MosaicForm {...args} />;
}
