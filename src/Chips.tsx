import { Chip } from "@simpleview/sv-mosaic";
import LinkIcon from "@mui/icons-material/Link";

export default function Chips() {
  return (
    <div>
      <Chip label="Without onClick" />
      <br />
      <br />
      <Chip label="With onClick" onClick={() => alert("Click!")} />
    </div>
  );
}
