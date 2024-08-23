import { useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
} from "react-table";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  Pagination,
  Typography,
  TextField,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import "./TableView.css";

const TableComponent = ({ data, filters, onPageChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Created Date",
        accessor: "created_dt",
        sortType: (a, b) => {
          const valA = a.original.created_dt
            ? new Date(a.original.created_dt)
            : 0;
          const valB = b.original.created_dt
            ? new Date(b.original.created_dt)
            : 0;
          return valA - valB;
        },
        Cell: ({ value }) =>
          value ? format(new Date(value), "MM/dd/yyyy HH:mm") : "N/A",
      },
      {
        Header: "Entity Type",
        accessor: "entity_type",
      },
      {
        Header: "Legal Name",
        accessor: "legal_name",
      },
      {
        Header: "Physical Address",
        accessor: "physical_address",
      },
      {
        Header: "USDOT Number",
        accessor: "usdot_number",
      },
      {
        Header: "Power Units",
        accessor: "power_units",
      },
      {
        Header: "Drivers",
        accessor: "drivers",
      },
      {
        Header: "Out of Service Date",
        accessor: "out_of_service_date",
        sortType: (a, b) => {
          const dateA = a.original.out_of_service_date
            ? new Date(a.original.out_of_service_date)
            : new Date(0);
          const dateB = b.original.out_of_service_date
            ? new Date(b.original.out_of_service_date)
            : new Date(0);
          return dateA - dateB;
        },
        Cell: ({ value }) =>
          value ? format(new Date(value), "MM/dd/yyyy HH:mm") : "N/A",
      },
      {
        Header: "Record Status",
        accessor: "record_status",
        Cell: ({ value }) =>
          value ? (
            <Chip
              label={value}
              color={value === "active" ? "success" : "default"}
            />
          ) : null,
      },
    ],
    []
  );
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, sortBy },
    gotoPage,
    setPageSize,
    pageOptions,
  } = useTable(
    {
      columns,
      data: data || [],
      initialState: {
        pageIndex:
          Number(queryParams.get("pageIndex")) -
            (queryParams.get("pageIndex") < 1 ? 0 : 1) || 0,
        pageSize: Number(queryParams.get("pageSize")) || 10,
        sortBy: queryParams.get("sortBy")
          ? [
              {
                id: queryParams.get("sortBy"),
                desc: queryParams.get("sortOrder") === "desc",
              },
            ]
          : [],
      },
    },
    useFlexLayout,
    useResizeColumns,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    queryParams.set("pageIndex", pageIndex + 1);
    queryParams.set("pageSize", pageSize);

    if (sortBy.length > 0) {
      queryParams.set("sortBy", sortBy[0].id);
      queryParams.set("sortOrder", sortBy[0].desc ? "desc" : "asc");
    }

    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [pageIndex, pageSize, sortBy]);

  return (
    <Box>
      <Table {...getTableProps()} className="table">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#ffffff",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardIcon fontSize="small" />
                      )
                    ) : null}
                  </span>
                  <div {...column.getResizerProps()} className="resizer" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {page.length === 0 && (
        <Box mt={2} textAlign="center" color="red">
          No filtered data available
        </Box>
      )}

      {/* Pagination Controls with Record Counts */}
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Typography variant="body2">
          Displaying{" "}
          <TextField
            select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            SelectProps={{
              native: true,
            }}
            className="custom-textfield"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </TextField>{" "}
          of {data.length} records
        </Typography>
        <Box>
          <Pagination
            count={pageOptions.length}
            page={pageIndex + 1}
            onChange={(e, page) => gotoPage(page - 1)}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TableComponent;
