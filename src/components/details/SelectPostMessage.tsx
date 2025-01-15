import React from "react";
import MainLayout from "../../layout/MainLayout";

const SelectPostMessage: React.FC = () => (
  <MainLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p className="text-center text-gray-700">
        Please select a post to see details.
      </p>
    </div>
  </MainLayout>
);

export default SelectPostMessage;
