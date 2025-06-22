import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  PaginationModule,
  ClientSideRowModelModule,
} from "ag-grid-community";

import { useMemo } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Register required AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

interface GenericDataGridProps {
  rowData: any[];
  columnDefs?: any[];
  onDelete?: (id: string) => void;
  onFilterChanged?: (filterModel: any) => void;
}

export const GenericDataGrid = ({
  rowData,
  columnDefs = [],
  onDelete,
  onFilterChanged,
}: GenericDataGridProps) => {
  const navigate = useNavigate();

  const defaultColDefs = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: false,
      resizable: true,
    }),
    []
  );

  const actionsColumn = {
    headerName: "Actions",
    cellRenderer: ({ data }: any) => (
      <>
        <Tooltip title="View">
          <IconButton onClick={() => navigate(`/car/${data._id}`)}>
            <VisibilityIcon color="info" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete?.(data._id)}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </Tooltip>
      </>
    ),
    pinned: "right",
    width: 150,
    filter: false,
    sortable: false,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={[...columnDefs, actionsColumn]}
        defaultColDef={defaultColDefs}
        onFilterChanged={(params) => {
          if (onFilterChanged) {
            console.log(params);
          }
        }}
        pagination
        paginationPageSize={20}
      />
    </div>
  );
};
