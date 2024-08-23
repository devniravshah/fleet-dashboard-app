import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Paper, TableContainer, CircularProgress, Box } from "@mui/material";

import { fetchData } from "../../services/dataService";
import { setData, setFilters } from "../../redux/slices/tableSlice";
import TableComponent from "./TableComponent";
import FiltersComponent from "./FiltersComponent";
import ChartComponent from "./ChartComponent";
import "./TableView.css";

const TableView = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);
  const filters = useSelector((state) => state.table.filters);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTableData = async () => {
      try {
        const data = await fetchData();
        if (data && Array.isArray(data)) {
          dispatch(setData(data));
        } else {
          console.error("Data format is not as expected.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTableData();
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = {};
    queryParams.forEach((value, key) => {
      if (["pageIndex", "pageSize", "sortBy", "sortOrder"].includes(key))
        return;
      filters[key] = value;
    });
    dispatch(setFilters(filters));
  }, [location.search, dispatch]);

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (!data || Object.keys(filters).length === 0) return data;

    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (key.includes("date")) {
          // Format the date in the row to match the filter format
          const formattedRowDate = format(
            new Date(row[key]),
            "yyyy-MM-dd'T'HH:mm"
          );
          return formattedRowDate.startsWith(value);
        }
        return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  const handleFilterApply = (newFilters) => {
    const queryParams = new URLSearchParams(location.search);
    for (let key in newFilters) {
      if (newFilters[key]) {
        queryParams.set(key, newFilters[key]);
      }
    }
    navigate(`?${queryParams?.toString()}`);
  };

  const handleResetFilters = () => {
    navigate(`?`);
    window.location.reload();
    dispatch(setFilters({}));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <p>No data available</p>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className="table-container">
      <FiltersComponent
        onApply={handleFilterApply}
        activeFilters={filters}
        onReset={handleResetFilters}
      />

      <TableComponent data={filteredData} />
      <ChartComponent data={filteredData} />
    </TableContainer>
  );
};

export default TableView;
