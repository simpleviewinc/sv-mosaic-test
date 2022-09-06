import { DataView as MosaicDataView } from "@simpleview/sv-mosaic";

import useGrid from "./useGrid";

export default function DataView() {
  const args = useGrid();

  return <MosaicDataView {...args} />;
}
