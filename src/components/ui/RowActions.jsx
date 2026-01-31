import { Pencil, Trash2 } from "lucide-react";
import IconButton from "./IconButton";

export default function RowActions({ onEdit, onDelete, editLabel, deleteLabel }) {
  return (
    <div className="row-actions flex items-center justify-end gap-2">
      <IconButton label={editLabel} onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </IconButton>
      <IconButton label={deleteLabel} onClick={onDelete} variant="danger">
        <Trash2 className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
