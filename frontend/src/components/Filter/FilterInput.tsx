import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

const filterOptions = [
  { value: "contains", label: "Contains" },
  { value: "equals", label: "Equals" },
  { value: "isEmpty", label: "Is Empty" },
  { value: "startsWith", label: "Starts With" },
  { value: "endsWith", label: "Ends With" },
];

interface FilterInputProps {
  label: string;
  operator: string;
  value: string;
  onOperatorChange: (newOperator: string) => void;
  onValueChange: (newValue: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  label,
  operator,
  value,
  onOperatorChange,
  onValueChange,
}) => {
  const handleOperatorChange = (event: SelectChangeEvent<string>) => {
    onOperatorChange(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {label} Filter:
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Operator</InputLabel>
          <Select
            value={operator}
            onChange={handleOperatorChange}
            label="Operator"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {filterOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Value"
          value={value}
          onChange={handleValueChange}
          disabled={operator === "" || operator === "isEmpty"}
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

export default FilterInput;
