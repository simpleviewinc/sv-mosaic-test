import { Fragment } from "react";
import { SummaryPageTopComponent, SideNav } from "@simpleview/sv-mosaic";

export default function SummaryPage(props) {
  return (
    <Fragment>
      <SummaryPageTopComponent {...props.top} />
      <SideNav {...props.sideNav} />
    </Fragment>
  );
}
