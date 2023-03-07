import { Fragment } from "react";
import {
  SummaryPageTopComponent,
  SideNav,
  Content,
  Card,
  SummaryPageTopComponentTypes,
  SideNavProps,
  ContentProps,
  CardProps
} from "@simpleview/sv-mosaic";

export interface SummaryPageProps {
  top: SummaryPageTopComponentTypes
  sideNav: SideNavProps
  content: ContentProps
  card: CardProps
}

export default function SummaryPage(props: SummaryPageProps) {
  return (
    <Fragment>
      <SummaryPageTopComponent {...props.top} />
      <div style={{ display: "flex" }}>
        <SideNav {...props.sideNav} />
        <Content {...props.content} />
        <Card {...props.card} />
      </div>
    </Fragment>
  );
}
