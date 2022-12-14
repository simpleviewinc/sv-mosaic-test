import { Button, FormDialog as Dialog } from "@simpleview/sv-mosaic";
import React from "react";

export default function () {
  const [open, setOpen] = React.useState(true);
  const buttons = React.useMemo(
    () => [
      {
        name: "Close Button",
        onClick: () => setOpen(false),
        color: "red",
        variant: "text",
        label: "Close"
      },
      {
        name: "Blue Button",
        onClick: () => alert("hi"),
        color: "blue",
        variant: "contained",
        label: "Blue Alert"
      },
      {
        name: "Black Button",
        onClick: () => alert("hi"),
        color: "black",
        variant: "outlined",
        label: "Outlined Alert",
        size: "small",
        fullWidth: true
      }
    ],
    [setOpen]
  );
  return (
    <div>
      <Dialog dialogTitle="Dialog Title" open={open} buttons={buttons}>
        Dialog Content
      </Dialog>
      <Button
        color="yellow"
        variant="contained"
        label="Open"
        onClick={() => setOpen(true)}
      />
    </div>
  );
}
