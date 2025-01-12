import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/header/HeaderComponent";
import PostsGrid from "./components/posts/postsGrid";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <PostsGrid />
    </div>
  );
}

export default App;
