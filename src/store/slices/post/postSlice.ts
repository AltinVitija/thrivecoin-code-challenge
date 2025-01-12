import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../../types/post/postType";
import {
  deletePost,
  fetchPosts,
  updatePost,
} from "../../../api/posts/postsService";
import { RootState } from "..";

export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });

    builder
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update post";
      });
    builder
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete post";
      });
  },
});

export default postsSlice.reducer;

// Selectors
export const selectAllPosts = (state: RootState) =>
  state.rootReducer.post.posts;
export const getPostsStatus = (state: RootState) =>
  state.rootReducer.post.status;
export const getPostsError = (state: RootState) => state.rootReducer.post.error;
