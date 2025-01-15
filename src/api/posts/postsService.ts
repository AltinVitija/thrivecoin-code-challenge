import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../../types/post/postType";
import { API_URL } from "../../config";

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Post[]>(`${API_URL}/posts`);
      console.log("Fetched Posts:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);

export const updatePost = createAsyncThunk<Post, Post>(
  "posts/updatePost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.put<Post>(
        `${API_URL}/posts/${post.id}`,
        post,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      console.log("Updated Post:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update the post:", error);
      return rejectWithValue("Failed to update the post.");
    }
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      console.log(`Deleted Post ID: ${id}`);
      return id;
    } catch (error) {
      console.error("Failed to delete the post:", error);
      return rejectWithValue("Failed to delete the post.");
    }
  }
);
