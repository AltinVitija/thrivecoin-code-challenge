import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "../../types/post/postType";

interface PostTableProps {
  posts: Post[];
  selectedIds: Set<number>;
  handleSelectAll: (checked: boolean) => void;
  handleSelect: (id: number) => void;
  navigateToDetails: (post: Post) => void;
  handleDeleteSelected: () => void;
}

interface HeadCell {
  id: keyof Post;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "id", numeric: true, label: "ID" },
  { id: "title", numeric: false, label: "Title" },
  { id: "body", numeric: false, label: "Body" },
  { id: "userId", numeric: true, label: "User ID" },
];

type Order = "asc" | "desc";

const Tabel: React.FC<PostTableProps> = ({
  posts,
  selectedIds,
  handleSelectAll,
  handleSelect,
  navigateToDetails,
  handleDeleteSelected,
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Post>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Post
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selectedIds.has(id);

  const visibleRows = React.useMemo(
    () =>
      [...posts]
        .sort((a, b) =>
          order === "asc"
            ? a[orderBy] > b[orderBy]
              ? 1
              : -1
            : a[orderBy] < b[orderBy]
            ? 1
            : -1
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [posts, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selectedIds.size > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}>
          {selectedIds.size > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div">
              {selectedIds.size} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div">
              Posts
            </Typography>
          )}
          {selectedIds.size > 0 ? (
            <Tooltip title="Delete Selected">
              <IconButton onClick={handleDeleteSelected}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            size={dense ? "small" : "medium"}
            aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selectedIds.size > 0 && selectedIds.size < posts.length
                    }
                    checked={
                      posts.length > 0 && selectedIds.size === posts.length
                    }
                    onChange={(event) => handleSelectAll(event.target.checked)}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, headCell.id)
                      }>
                      {headCell.label}
                      {orderBy === headCell.id ? (
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
              {visibleRows.map((post) => {
                const isItemSelected = isSelected(post.id);
                return (
                  <TableRow
                    hover
                    onClick={(e) => {
                      if ((e.target as HTMLElement).tagName !== "INPUT") {
                        navigateToDetails(post);
                      }
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={post.id}
                    selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() => handleSelect(post.id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {post.id}
                    </TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.body}</TableCell>
                    <TableCell align="right">{post.userId}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        sx={{ ml: 1 }}
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default Tabel;
