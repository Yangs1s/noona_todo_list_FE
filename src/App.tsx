import { Routes, Route } from "react-router-dom";
import ToDoListPage from "./pages/TodoListPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./routes/PrivateRoute";
import { useState } from "react";
import type { User } from "./types/user";
import api from "./utils/api";
import { useEffect } from "react";
function App() {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);
  return (
    <Routes>
      <Route
        path="/todo"
        element={
          <PrivateRoute user={user}>
            <ToDoListPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LoginPage user={user} setUser={setUser} />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
