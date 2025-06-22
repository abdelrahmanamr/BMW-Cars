import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import FilterInput from "./FilterInput";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReplayIcon from "@mui/icons-material/Replay";
import { FilterPayload } from "../../types/filter.types";

interface FiltersToolBarProps {
  onFilterApply: (filters: FilterPayload) => void;
  onResetFilters: () => void;
}

const FiltersToolBar: React.FC<FiltersToolBarProps> = ({
  onFilterApply,
  onResetFilters,
}) => {
  // Filters
  const [brandFilter, setBrandFilter] = useState("");
  const [brandOperatorFilter, setBrandOperatorFilter] = useState("");

  const [modelFilter, setModelFilter] = useState("");
  const [modelOperatorFilter, setModelOperatorFilter] = useState("");

  const [plugTypeFilter, setPlugTypeFilter] = useState("");
  const [plugTypeOperatorFilter, setPlugTypeOperatorFilter] = useState("");

  const [bodyStyleFilter, setBodyStyleFilter] = useState("");
  const [bodyStyleOperatorFilter, setBodyStyleOperatorFilter] = useState("");

  const handleResetFilter = () => {
    setBrandFilter("");
    setBrandOperatorFilter("");
    setModelFilter("");
    setModelOperatorFilter("");
    setPlugTypeFilter("");
    setPlugTypeOperatorFilter("");
    setBodyStyleFilter("");
    setBodyStyleOperatorFilter("");
    onResetFilters();
  };

  const handleOnFiltersApply = () => {
    const filters = [];

    if (
      brandOperatorFilter &&
      (brandFilter || brandOperatorFilter === "isEmpty")
    ) {
      filters.push({
        field: "brand",
        operator: brandOperatorFilter,
        value: brandOperatorFilter === "isEmpty" ? "" : brandFilter,
      });
    }

    if (
      modelOperatorFilter &&
      (modelFilter || modelOperatorFilter === "isEmpty")
    ) {
      filters.push({
        field: "carModel",
        operator: modelOperatorFilter,
        value: modelOperatorFilter === "isEmpty" ? "" : modelFilter,
      });
    }

    if (
      plugTypeOperatorFilter &&
      (plugTypeFilter || plugTypeOperatorFilter === "isEmpty")
    ) {
      filters.push({
        field: "plugType",
        operator: plugTypeOperatorFilter,
        value: plugTypeOperatorFilter === "isEmpty" ? "" : plugTypeFilter,
      });
    }

    if (
      bodyStyleOperatorFilter &&
      (bodyStyleFilter || bodyStyleOperatorFilter === "isEmpty")
    ) {
      filters.push({
        field: "bodyStyle",
        operator: bodyStyleOperatorFilter,
        value: bodyStyleOperatorFilter === "isEmpty" ? "" : bodyStyleFilter,
      });
    }

    const filterPayload = { filters };

    console.log(filterPayload); // ✅ For debugging

    onFilterApply(filterPayload);
  };
  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={3}>
        <FilterInput
          label={"Brand"}
          operator={brandOperatorFilter}
          value={brandFilter}
          onOperatorChange={setBrandOperatorFilter}
          onValueChange={setBrandFilter}
        />
      </Grid>
      <Grid size={3}>
        <FilterInput
          label={"Model"}
          operator={modelOperatorFilter}
          value={modelFilter}
          onOperatorChange={setModelOperatorFilter}
          onValueChange={setModelFilter}
        />
      </Grid>
      <Grid size={3}>
        <FilterInput
          label={"Plug Type"}
          operator={plugTypeOperatorFilter}
          value={plugTypeFilter}
          onOperatorChange={setPlugTypeOperatorFilter}
          onValueChange={setPlugTypeFilter}
        />
      </Grid>
      {/* 4th column: The submit button, aligned vertically centered */}

      {/* Next row */}
      <Grid size={3}>
        <FilterInput
          label={"Body Style"}
          operator={bodyStyleOperatorFilter}
          value={bodyStyleFilter}
          onOperatorChange={setBodyStyleOperatorFilter}
          onValueChange={setBodyStyleFilter}
        />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" size={12}>
        <Button
          variant="outlined"
          endIcon={<ReplayIcon />}
          onClick={handleResetFilter}
        >
          Reset Filters
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          onClick={handleOnFiltersApply}
        >
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default FiltersToolBar;
