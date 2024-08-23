import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Box,
} from "@mui/material";

const FiltersComponent = ({ onApply, activeFilters, onReset }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const columns = [
    { value: "created_dt", label: "Created Date" },
    { value: "entity_type", label: "Entity Type" },
    { value: "legal_name", label: "Legal Name" },
    { value: "physical_address", label: "Physical Address" },
    { value: "usdot_number", label: "USDOT Number" },
    { value: "power_units", label: "Power Units" },
    { value: "drivers", label: "Drivers" },
    { value: "out_of_service_date", label: "Out of Service Date" },
    { value: "record_status", label: "Record Status" },
  ];

  useEffect(() => {
    if (activeFilters) {
      const filtersOnly = Object.keys(activeFilters).reduce((acc, key) => {
        if (columns.filter((col) => col.value === key).length > 0) {
          acc[key] = activeFilters[key];
        }
        return acc;
      }, {});
      setSelectedColumns(Object.keys(filtersOnly));
      setFilterValues(filtersOnly);
    }
  }, [activeFilters]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleColumnSelect = (column) => {
    const isSelected = selectedColumns.includes(column.value);
    const newSelectedColumns = isSelected
      ? selectedColumns.filter((col) => col !== column.value)
      : [...selectedColumns, column.value];
    setSelectedColumns(newSelectedColumns);
    handleCloseMenu();
  };

  const handleFilterChange = (column, value) => {
    const formattedValue =
      column.includes("date") && value
        ? format(new Date(value), "yyyy-MM-dd'T'HH:mm")
        : value;

    setFilterValues((prevValues) => ({
      ...prevValues,
      [column]: formattedValue,
    }));
  };

  const applyFilters = () => {
    onApply(filterValues);
  };

  const handleResetFilters = () => {
    onReset();
  };

  return (
    <Box className="filters">
      <Box>
        <Button variant="outlined" onClick={handleOpenMenu}>
          Select Columns
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {columns.map((column) => (
            <MenuItem
              key={column.value}
              onClick={() => handleColumnSelect(column)}
            >
              <Checkbox checked={selectedColumns.includes(column.value)} />
              <ListItemText primary={column.label} />
            </MenuItem>
          ))}
        </Menu>

        {selectedColumns.map((column) => (
          <TextField
            key={column}
            label={`Filter by ${
              columns.find((col) => col.value === column)?.label
            }`}
            variant="outlined"
            className="filter-input"
            value={filterValues[column] || ""}
            onChange={(e) => handleFilterChange(column, e.target.value)}
            type={column.includes("date") ? "datetime-local" : "text"}
          />
        ))}
      </Box>
      <Box>
        <Button
          onClick={applyFilters}
          variant="contained"
          color="primary"
          className="apply-filter-button"
          disabled={
            selectedColumns.length === 0 ||
            Object.keys(filterValues).every((key) => !filterValues[key])
          }
        >
          Apply Filter
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="contained"
          color="secondary"
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FiltersComponent;
