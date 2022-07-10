import {
  DataView as MosaicDataView,
  DataViewProps
} from "@simpleview/sv-mosaic";

export default function DataView() {
  const columns: DataViewProps["columns"] = [
    {
      name: "foo",
      label: "Foo"
    },
    {
      name: "bar",
      label: "Bar"
    }
  ];

  const data = [
    {
      foo: "foo.1",
      bar: "bar.1"
    },
    {
      foo: "foo.2",
      bar: "bar.2"
    }
  ];

  const buttons: DataViewProps["buttons"] = [
    {
      name: "create",
      label: "Create",
      color: "yellow",
      variant: "contained"
    }
  ];

  return (
    <MosaicDataView
      title="Test DataView"
      columns={columns}
      data={data}
      buttons={buttons}
    />
  );
}
