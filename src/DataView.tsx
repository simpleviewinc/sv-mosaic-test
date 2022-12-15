import { DataView as MosaicDataView } from "@simpleview/sv-mosaic";
import useGrid from "./useGrid";
import useDb from "./useDb";

export default function DataView() {
  useDb();

  const args = useGrid();

  return <MosaicDataView {...args} />;
}
