import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

const getMatrixDataView = ({ data }) => ({
  columns: [
    {
      name: "id",
      label: "ID"
    },
    {
      name: "description",
      label: "Description"
    },
    {
      name: "title",
      label: "Title"
    }
  ],
  primaryActions: [
    {
      name: "edit",
      color: "black",
      variant: "icon",
      mIcon: Edit,
      onClick: function ({ data }) {
        alert(`EDIT ${data.id}`);
      }
    },
    {
      name: "delete",
      color: "black",
      variant: "icon",
      mIcon: Delete,
      onClick: function ({ data }) {
        alert(`DELETE ${data.id}`);
      }
    }
  ],
  sticky: true,
  data,
  limit: 25,
  display: "list",
  activeColumns: ["id", "description", "title"]
});

export default getMatrixDataView;
