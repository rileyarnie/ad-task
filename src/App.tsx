import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

function App() {
  const currentUser = useContext(AuthContext).currentUser;

  const IsAuthenticated: React.FC<{ children: any }> = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <IsAuthenticated>
              <Homepage />
            </IsAuthenticated>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <IsAuthenticated>
              <PostDetail />
            </IsAuthenticated>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
