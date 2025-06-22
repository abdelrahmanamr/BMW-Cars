import { useEffect, useState } from "react";
import {
  deleteCarById,
  fetchCarsBySearch,
  filterCars,
  getCars,
} from "../api/cars.api";
import { GenericDataGrid } from "../components/DataGrid/GernericDataGrid";
import { TextField, Box, Button, Typography } from "@mui/material";
import { Car } from "../types/car.types";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FiltersToolBar from "../components/Filter/FiltersToolbar";
import { FilterPayload } from "../types/filter.types";

const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchCars = async () => {
    const response = await getCars();
    setCars(response);
  };

  useEffect(() => {
    if (query.length === 0) {
      fetchCars();
    }
  }, [query]);

  const handleSearch = async () => {
    if (query) {
      const res = await fetchCarsBySearch(query);
      setCars(res);
    } else {
      await fetchCars();
    }
  };

  const handleOnFiltersApply = async (filters: FilterPayload) => {
    const res = await filterCars(filters);
    setCars(res);
  };

  const handleResetFilters = async () => {
    await handleSearch();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCarById(id);
      await handleSearch();
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <Box p={4}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left side: logo + title */}
        <Box display="flex" alignItems="center" gap={1}>
          <img src="/bmw-logo.svg" alt="Logo" style={{ height: 40 }} />
          <Typography variant="h5" fontWeight="bold">
            Car Database
          </Typography>
        </Box>

        {/* Right side: search input + button */}
        <Box display="flex" gap={1}>
          <TextField
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
          <Button
            variant="outlined"
            endIcon={<FilterAltIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <FiltersToolBar
          onFilterApply={handleOnFiltersApply}
          onResetFilters={handleResetFilters}
        />
      )}

      <GenericDataGrid
        rowData={cars}
        columnDefs={[
          { headerName: "Brand", field: "brand" },
          { headerName: "Model", field: "carModel" },
          { headerName: "Range (km)", field: "range_Km" },
          { headerName: "Plug Type", field: "plugType" },
          { headerName: "Body Style", field: "bodyStyle" },
          { headerName: "Top Speed (km/h)", field: "topSpeed_Kmh" },
          { headerName: "Seats", field: "seats" },
          { headerName: "Price (€)", field: "priceEuro" },
        ]}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Home;
