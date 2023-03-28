import { Chip } from "@simpleview/sv-mosaic";
import LinkIcon from "@mui/icons-material/Link";

export default function Chips() {
  return (
    <div>
      <Chip label="Without onClick" />
      <br />
      <br />
      <Chip label="With onClick" onClick={() => alert("Click!")} />
      <br />
      <br />
      <Chip label="With onDelete" onDelete={() => alert("onDelete Click!")} />
      <br />
      <br />
      <Chip label="With onDelete and onClick" onClick={() => alert("onClick Clicked!")} onDelete={() => alert("onDelete Clicked!")} />
    </div>
  );
}
