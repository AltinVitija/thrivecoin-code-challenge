import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../../store/slices/post/postSlice";
import { fetchPosts, updatePost } from "../../api/posts/postsService";
import Details from "../../components/details/Details";
import { Post } from "../../types/post/postType";
import MainLayout from "../../layout/MainLayout";
import LoadingOverlay from "../../components/loading/Loading";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  const postId = Number(id);
  const post = posts.find((p) => p.id === postId);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editedPost, setEditedPost] = React.useState<Post | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleSaveEdit = () => {
    if (editedPost) {
      dispatch(updatePost(editedPost));
      setIsEditing(false);
    }
  };

  const handleNavigateBack = () => {
    navigate("/dashboard");
  };

  if (status === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LoadingOverlay isLoading={status === "loading"} message="Loading..." />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <MainLayout>
      {post ? (
        <Details
          post={post}
          isEditing={isEditing}
          editedPost={editedPost}
          setEditedPost={setEditedPost}
          setIsEditing={setIsEditing}
          handleSaveEdit={handleSaveEdit}
          navigateBack={handleNavigateBack}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p>Post not found</p>
        </div>
      )}
    </MainLayout>
  );
};

export default DetailsPage;
