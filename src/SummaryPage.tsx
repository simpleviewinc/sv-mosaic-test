import { Fragment } from "react";
import {
  SummaryPageTopComponent,
  SideNav,
  Content
} from "@simpleview/sv-mosaic";

export default function SummaryPage(props) {
  return (
    <Fragment>
      <SummaryPageTopComponent {...props.top} />
      <div style={{ display: "flex" }}>
        <SideNav {...props.sideNav} />
        <Content {...props.content} />
      </div>
    </Fragment>
  );
}
