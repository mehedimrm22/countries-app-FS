import { IconButton, Tooltip } from "@mui/material";
import { TestData } from "../types/test";
import { Delete, Edit } from "@mui/icons-material";

interface DataActionsProps {
  row: TestData;
  onEdit: (data: TestData) => void;
  onDelete: () => void;
}

const DataActions = ({ row, onEdit, onDelete }: DataActionsProps) => {
  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => onEdit(row)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => onDelete}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DataActions;
