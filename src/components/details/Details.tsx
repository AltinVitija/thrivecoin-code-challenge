import React from "react";
import { Post } from "../../types/post/postType";
import CustomButton from "../button/Button";
import CustomTextField from "../input/custom-textfield";

interface DetailsProps {
  post: Post;
  isEditing: boolean;
  editedPost: Post | null;
  setEditedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveEdit: () => void;
  navigateBack: () => void;
}

const Details: React.FC<DetailsProps> = ({
  post,
  isEditing,
  editedPost,
  setEditedPost,
  setIsEditing,
  handleSaveEdit,
  navigateBack,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-end items-center mb-6">
        {!isEditing && (
          <CustomButton
            text="Edit Details"
            onClick={() => {
              setIsEditing(true);
              setEditedPost(post);
            }}
            width="120px"
            height="40px"
            sx={{
              backgroundColor: "#000000",
              "&:hover": { backgroundColor: "#000000" },
            }}
          />
        )}
      </div>

      <div className="bg-white ml-[20%] shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Post Details
          </h3>
        </div>
        <div className="border-t border-gray-200">
          {isEditing && editedPost ? (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-500 col-span-1">
                  Title
                </label>

                <CustomTextField
                  sx={{ width: "605px" }}
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-500 col-span-1">
                  Body
                </label>
                <textarea
                  value={editedPost.body}
                  onChange={(e) =>
                    setEditedPost((prev) =>
                      prev ? { ...prev, body: e.target.value } : null
                    )
                  }
                  className="col-span-2 p-2 border rounded-md"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <CustomButton
                  text="Cancel"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedPost(null);
                  }}
                  width="100px"
                  height="40px"
                  sx={{
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    "&:hover": { backgroundColor: "#e5e7eb" },
                  }}
                />
                <CustomButton
                  text="Save Changes"
                  onClick={handleSaveEdit}
                  width="140px"
                  height="40px"
                  sx={{
                    backgroundColor: "#000000",
                    "&:hover": { backgroundColor: "#000000" },
                  }}
                />
              </div>
            </div>
          ) : (
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {post.title}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Body</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {post.body}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
