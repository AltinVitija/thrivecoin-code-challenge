import React from "react";
import PostTable from "../posts/Tabel";
import { Post } from "../../types/post/postType";

interface DashboardProps {
  posts: Post[];
  selectedIds: Set<number>;
  handleSelectAll: (checked: boolean) => void;
  handleSelect: (id: number) => void;
  handleDeleteSelected: () => void;
  navigateToDetails: (post: Post) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  posts,
  selectedIds,
  handleSelectAll,
  handleSelect,
  handleDeleteSelected,
  navigateToDetails,
}) => {
  return (
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
  );
};

export default Dashboard;
