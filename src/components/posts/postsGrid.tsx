import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import {
  fetchPosts,
  updatePost,
  deletePost,
} from "../../api/posts/postsService";
import { Post } from "../../types/post/postType";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../../store/slices/post/postSlice";

const PostsGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  const [pageSize, setPageSize] = useState<number>(10);
  const [editRow, setEditRow] = useState<Post | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedBody, setEditedBody] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleEditClick = (post: Post) => {
    setEditRow(post);
    setEditedTitle(post.title);
    setEditedBody(post.body);
    setOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        toast.success("Post deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete the post.");
      });
  };

  const handleClose = () => {
    setOpen(false);
    setEditRow(null);
  };

  const handleSave = () => {
    if (editRow) {
      const updatedPost: Post = {
        ...editRow,
        title: editedTitle,
        body: editedBody,
      };
      dispatch(updatePost(updatedPost))
        .unwrap()
        .then(() => {
          toast.success("Post updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update the post.");
        });
      handleClose();
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "title", headerName: "Title", width: 250, editable: false },
    { field: "body", headerName: "Body", width: 400, editable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const post: Post = params.row as Post;
        return (
          <div className="flex space-x-2">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleEditClick(post)}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDeleteClick(post.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  let content;

  if (status === "loading") {
    content = <p>Loading posts...</p>;
  } else if (status === "succeeded") {
    content = (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid<Post>
          rows={posts}
          columns={columns}
          paginationModel={{ pageSize: pageSize, page: 0 }}
          onPaginationModelChange={(model) => setPageSize(model.pageSize)}
          pageSizeOptions={[5, 10, 20]}
          pagination
          disableRowSelectionOnClick
        />
      </div>
    );
  } else if (status === "failed") {
    content = <p>Error: {error}</p>;
  }

  return (
    <div className="p-4 py-20">
      {content}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Body"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostsGrid;
