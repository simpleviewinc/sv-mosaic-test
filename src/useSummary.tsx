import { useCallback } from "react";
import Settings from "@mui/icons-material/Settings";
import Delete from "@mui/icons-material/Delete";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import Terminal from "@mui/icons-material/Terminal";
import Interests from "@mui/icons-material/Interests";
import Mood from "@mui/icons-material/Mood";
import PlusOne from "@mui/icons-material/PlusOne";
import {
  Button,
  transform_dateFormat,
  transform_boolean,
  transform_colorPicker
} from "@simpleview/sv-mosaic";
import Home from "@mui/icons-material/Home";

const transform_text = () => {
  return ({ data }) => data;
};

export default function useSummary() {
  /**
   * SummaryPageTopComponent Props
   */

  const options = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" }
  ];

  const getOptions = () => {
    return {
      docs: options,
      hasMore: false
    };
  };

  const getSelected = (id) => {
    return options.filter((val) => val.value === id)[0];
  };

  const filter = {
    label: "Test Filter",
    args: { getOptions, getSelected, required: false }
  };

  const favorite = {
    checked: true,
    onClick: (val) => {
      alert(`Star changed to ${val ? "checked" : "unchecked"}`);
    }
  };

  const mainActions = [
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

  const additionalActions = [
    {
      label: "Test",
      onClick: () => alert("Test Click")
    },
    {
      label: "Additional Action",
      onClick: () => alert("Additional Action Click")
    }
  ];

  const descriptionItems = [
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

  /**
   * SideNav Props
   */

  const links = [
    [
      {
        label: "Home",
        onClick: () => alert("Home"),
        icon: Home
      },
      {
        label: "Accounts",
        onClick: () => alert("Accounts"),
        icon: ManageAccounts
      },
      {
        label: "Gallery",
        onClick: () => alert("Gallery")
      },
      {
        label: "Visitors",
        onClick: () => alert("Visitors")
      },
      {
        label: "Sitemap",
        onClick: () => alert("Sitemap")
      }
    ],
    [
      {
        label: "Assets",
        onClick: () => alert("Assets")
      },
      {
        label: "Map Publisher",
        onClick: () => alert("Map Publisher")
      },
      {
        label: "Dynamic Content",
        onClick: () => alert("Dynamic Content")
      }
    ],
    [
      {
        label: "Tasks",
        badge: "99",
        onClick: () => alert("Tasks")
      },
      {
        label: "Documents",
        onClick: () => alert("Documents")
      },
      {
        label: "Notes",
        badge: "1",
        onClick: () => alert("Notes")
      }
    ]
  ];

  /**
   * Content Props
   */

  const fieldDef = [
    {
      name: "text",
      label: "Text",
      transforms: [transform_text()]
    },
    {
      name: "date",
      label: "Date",
      transforms: [transform_dateFormat()]
    },
    {
      name: "boolean",
      label: "Boolean",
      transforms: [transform_boolean()]
    },
    {
      name: "color",
      label: "Color",
      transforms: [transform_colorPicker()]
    }
  ];

  const sections = [
    [["text"], ["boolean"]],
    [["date"], ["color"]]
  ];

  const values = {
    text: "This is a text",
    date: new Date("April 22, 1998 09:00:00"),
    boolean: true,
    color: "#008000"
  };

  const getValues = useCallback(async function () {
    return values;
  }, []);

  const onEdit = () => alert("Edit button clicked");

  /**
   * Card Props
   */

  const topAction = {
    color: "blue",
    variant: "icon",
    onClick: () => alert("topAction Card click"),
    mIcon: Mood
  };

  const bottomAction = {
    color: "teal",
    label: "Add a new task",
    variant: "text",
    onClick: () => alert("Add new task clicked"),
    mIcon: PlusOne
  };

  const contentCard = [
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
      title: "Summary Title",
      img:
        "https://i.pinimg.com/474x/7b/90/a8/7b90a80aa5b93b640d9b84b73559332e.jpg",
      filter,
      favorite,
      mainActions,
      additionalActions,
      descriptionItems
    },
    sideNav: {
      links
    },
    content: {
      title: "Content Title",
      fieldDef,
      sections,
      getValues,
      onEdit
    },
    card: {
      title: "Card Title",
      titleIcon: <Interests />,
      topAction,
      content: contentCard,
      bottomAction
    }
  };
}
