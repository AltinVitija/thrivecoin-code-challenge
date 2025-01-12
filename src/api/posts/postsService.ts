import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../types/post/postType";
import { API_URL } from "../../config";

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts.");
    }

    const data: Post[] = await response.json();
    console.log("Fetched Posts:", data);
    return data;
  }
);

export const updatePost = createAsyncThunk<Post, Post>(
  "posts/updatePost",
  async (post) => {
    const response = await fetch(`${API_URL}/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update the post.");
    }

    const data: Post = await response.json();
    console.log("Updated Post:", data);
    return data;
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the post.");
    }

    console.log(`Deleted Post ID: ${id}`);
    return id;
  }
);
