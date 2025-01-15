import React, { useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../../store/slices/post/postSlice";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchPosts } from "../../api/posts/postsService";
import PostTable from "../../components/posts/Tabel";
import { Post } from "../../types/post/postType";
import LoadingOverlay from "../../components/loading/Loading";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(posts.map((post) => post.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id: number) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      dispatch(deletePost(id));
    });
    setSelectedIds(new Set());
  };

  const navigateToDetails = (post: Post) => {
    navigate(`/details/${post.id}`);
  };

  return (
    <MainLayout>
      <div className="grid px-[5%] ml-[9%] w-full gap-6 mb-8">
        {status === "loading" && (
          <LoadingOverlay
            isLoading={status === "loading"}
            message="Loading posts..."
          />
        )}
        {status === "failed" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {status === "succeeded" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Posts Dashboard
              </h2>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <PostTable
                posts={posts}
                selectedIds={selectedIds}
                handleSelectAll={handleSelectAll}
                handleSelect={handleSelect}
                navigateToDetails={navigateToDetails}
                handleDeleteSelected={handleDeleteSelected}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
