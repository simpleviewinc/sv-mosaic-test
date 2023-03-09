import { Button, ButtonRow, H1 } from "@simpleview/sv-mosaic";
import LinkIcon from "@mui/icons-material/Link";

export default function Buttons() {
  return (
    <div>
      <h3>Contained</h3>
      <ButtonRow>
        <Button color="yellow" variant="contained" label="Test" />
      </ButtonRow>
      <h3>With href</h3>
      <ButtonRow>
        <Button color="blue" variant="icon" mIcon={LinkIcon} href="https://google.com" />
        <Button color="blue" variant="contained" label="Google" href="https://google.com" />
        <Button color="blue" variant="contained" label="Disabled" href="https://google.com" disabled />
        <Button color="blue" variant="contained" label="With click handler" href="https://google.com" onClick={() => alert("Click!")} />
        <Button color="blue" variant="contained" label="With click handler disabled" href="https://google.com" onClick={() => alert("Click!")} disabled />
        <Button color="blue" variant="contained" label="With click handler and prevent default" href="https://google.com" onClick={(e) => { e.preventDefault(); alert("Click!"); }} />
      </ButtonRow>
    </div>
  );
}
