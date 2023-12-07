import { useState, useMemo, memo } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import { visuallyHidden } from "@mui/utils";
import { orderBy as _orderBy } from "lodash";
import { toMiles } from "./util.js";

const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    render: (row, value) => (
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Avatar alt={value} src={row.image_url} />
        </Grid>
        <Grid item>
          <Link sx={{ textDecoration: "none" }} href={row.url}>
            {value}
          </Link>
        </Grid>
      </Grid>
    ),
  },
  {
    id: "location.city",
    label: "City",
    minWidth: 170,
    render: row => <Typography>{(row.location || {}).city}</Typography>,
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 170,
    render: (row, value) => (
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Rating defaultValue={value} name="rating" precision={0.1} readOnly />
        </Grid>
        <Grid item>
          <Typography>{value}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            ({(row.review_count || "").toLocaleString()} reviews)
          </Typography>
        </Grid>
      </Grid>
    ),
  },
  {
    id: "distance",
    label: "Distance",
    minWidth: 170,
    render: (_row, value) => {
      let m = toMiles(value);
      return (
        <Typography>
          {m} {m <= 1 ? "mile" : "miles"}
        </Typography>
      );
    },
  },
];

function BusinessTable({ rows, page, setPage, loading }) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("rating");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      _orderBy(rows, orderBy, order).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      {loading && (
        <Card>
          <CardContent>
            <CircularProgress />
          </CardContent>
        </Card>
      )}
      {!loading && visibleRows.length === 0 && (
        <Card>
          <CardContent>
            <Typography color="text.secondary">No results available</Typography>
          </CardContent>
        </Card>
      )}
      {!loading && visibleRows.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sortDirection={orderBy === column.id ? order : false}>
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}>
                        <Typography variant="h6">{column.label}</Typography>
                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={`${column.id}-${row.id}`}
                            align={column.align}>
                            {column.render ? (
                              column.render(row, value)
                            ) : (
                              <Typography>{value}</Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}

export default memo(BusinessTable);
