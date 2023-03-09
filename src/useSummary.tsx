import { useCallback, useMemo, useState } from "react";
import Settings from "@mui/icons-material/Settings";
import Delete from "@mui/icons-material/Delete";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import Terminal from "@mui/icons-material/Terminal";
import Interests from "@mui/icons-material/Interests";
import Mood from "@mui/icons-material/Mood";
import PlusOne from "@mui/icons-material/PlusOne";
import Edit from "@mui/icons-material/Edit";
import ToggleOff from "@mui/icons-material/ToggleOff";
import ToggleOn from "@mui/icons-material/ToggleOn";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  CardProps,
  DataViewColumnTransform,
  transform_dateFormat,
  transform_boolean,
  transform_colorPicker,
  SummaryPageTopComponentTypes,
  SideNavProps,
  ContentProps,
} from "@simpleview/sv-mosaic";
import Home from "@mui/icons-material/Home";

import { SummaryPageProps } from "./SummaryPage";
import { useNavigate } from "react-router-dom";

const transform_text = (): DataViewColumnTransform<string> => {
  return ({ data }) => data;
};

export default function useSummary(): SummaryPageProps {
  /**
   * SummaryPageTopComponent Props
   */
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const favorite: SummaryPageTopComponentTypes["favorite"] = {
    checked,
    onClick: (val) => {
      alert(`Star changed to ${val ? "checked" : "unchecked"}`);
      setChecked(val);
    }
  };

  const mainActions: SummaryPageTopComponentTypes["mainActions"] = [
    {
      label: "Button 1",
      mIcon: Settings,
      onClick: () => alert("Button 1 Click"),
      color: "black",
      variant: "text"
    },
    {
      label: "Button 2",
      mIcon: Delete,
      onClick: () => alert("Button 2 Click"),
      color: "red",
      variant: "text"
    },
    {
      label: "Button 3",
      mIcon: ManageAccounts,
      onClick: () => alert("Button 3 Click"),
      color: "black",
      variant: "text"
    }
  ];

  const additionalActions: SummaryPageTopComponentTypes["additionalActions"] = [
    {
      label: "Test",
      onClick: () => alert("Test Click")
    },
    {
      label: "Additional Action",
      onClick: () => alert("Additional Action Click")
    }
  ];

  const descriptionItems: SummaryPageTopComponentTypes["descriptionItems"] = [
    <h5 key={1}>A description</h5>,
    <h5 key={2}>Test description</h5>,
    <Button
      key={3}
      color="yellow"
      variant="contained"
      label="Description btn"
      onClick={() => alert("Description btn Click")}
    />,
    <Button
      key={4}
      color="blue"
      variant="contained"
      label="Icon btn"
      mIcon={Terminal}
      onClick={() => alert("Icon btn Click")}
    />
  ];

  const onBack = useCallback<NonNullable<SummaryPageTopComponentTypes["onBack"]>>(() => {
    navigate(-1);
  }, [navigate]);

  /**
   * SideNav Props
   */
  const items: SideNavProps["items"] = [
    [
      {
        label: "Home",
        name: "home",
        icon: Home
      },
      {
        label: "Accounts",
        name: "accounts",
        icon: ManageAccounts
      },
      {
        label: "Gallery",
        name: "gallety"
      },
      {
        label: "Visitors",
        name: "visitors"
      },
      {
        label: "Sitemap",
        name: "sitemap"
      }
    ],
    [
      {
        label: "Assets",
        name: "assets",
        onNav: () => alert("Assets")
      },
      {
        label: "Map Publisher",
        name: "map_publisher",
        onNav: () => alert("Map Publisher")
      },
      {
        label: "Dynamic Content",
        name: "dynamic_content",
        onNav: () => alert("Dynamic Content")
      }
    ],
    [
      {
        label: "Tasks",
        name: "tasks",
        badge: "99",
        onNav: () => alert("Tasks"),
        action: {
          icon: AddCircleOutline,
          onClick: () => alert("Add task clicked")
        }
      },
      {
        label: "Documents",
        name: "documents",
        onNav: () => alert("Documents")
      },
      {
        label: "Notes",
        name: "notes",
        badge: "1",
        onNav: () => alert("Notes")
      }
    ]
  ];

  /**
   * Content Props
   */
  const [variant, setVariant] = useState<NonNullable<ContentProps["variant"]>>("card");

  const fields: ContentProps["fields"] = [
    {
      name: "content_variant",
      label: `Content variant`
    },
    {
      name: "text",
      label: <b>Text</b>,
      transforms: [transform_text() as DataViewColumnTransform]
    },
    {
      name: "date",
      label: "Date",
      transforms: [transform_dateFormat() as DataViewColumnTransform]
    },
    {
      name: "boolean",
      label: "Boolean",
      transforms: [transform_boolean() as DataViewColumnTransform]
    },
    {
      name: "color",
      label: "Color",
      transforms: [transform_colorPicker() as DataViewColumnTransform]
    }
  ];

  const sections: ContentProps["sections"] = [
    [["content_variant"], ["text"], ["boolean"]],
    [["date"], ["color"]]
  ];

  const data: ContentProps["data"] = useMemo(() => ({
    content_variant: variant,
    text: "This is a text",
    date: new Date("April 22, 1998 09:00:00"),
    boolean: true,
    color: "#008000"
  }), [variant]);

  const buttons: ContentProps["buttons"] = useMemo(() => [
    {
      name: "edit",
      mIcon: Edit,
      color: "gray",
      variant: "icon",
      onClick: () => alert("Edit button clicked")
    },
    {
      name: "toggle_variant",
      mIcon: variant === "card" ? ToggleOff : ToggleOn,
      color: "gray",
      variant: "icon",
      tooltip: `Toggle the card variant(card or standard), current: ${variant}`,
      onClick: () => setVariant(variant === "standard" ? "card" : "standard")
    }
  ], [variant]);

  /**
   * Card Props
   */

  const topActions: CardProps["topActions"] = [
    {
      color: "blue",
      variant: "icon",
      onClick: () => alert("topAction Card click"),
      mIcon: Mood
    }
  ];

  const bottomActions: CardProps["bottomActions"] = [
    {
      color: "teal",
      label: "Add a new task",
      variant: "text",
      onClick: () => alert("Add new task clicked"),
      mIcon: PlusOne
    }
  ];

  const contentCard: CardProps["content"] = [
    <h1>Card Content Title</h1>,
    <h3>Sub title</h3>,
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        consectetur, beatae dignissimos cum obcaecati minima blanditiis dolore
        nisi magnam facilis, autem sequi! Saepe quos esse enim, tenetur sunt
        ipsum sed.
      </p>
      <Button
        color="yellow"
        variant="contained"
        label="Card btn"
        onClick={() => alert("Card btn Click")}
      />
      <Button
        color="blue"
        variant="contained"
        label="Test Card btn"
        mIcon={Terminal}
        onClick={() => alert("Test Card btn")}
      />
    </div>
  ];

  return {
    top: {
      onBack,
      title: "Summary Title",
      img:
        "https://i.pinimg.com/474x/7b/90/a8/7b90a80aa5b93b640d9b84b73559332e.jpg",
      favorite,
      mainActions,
      additionalActions,
      descriptionItems
    },
    sideNav: {
      items,
      onNav: ({ item }) => alert("Global on nav handler for: " + item.label)
    },
    content: {
      variant: variant,
      title: "Content Title",
      fields,
      sections,
      data,
      buttons
    },
    card: {
      title: "Card Title",
      titleIcon: Interests,
      topActions,
      content: contentCard,
      bottomActions
    }
  };
}
