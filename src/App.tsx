import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import Board from "./pages/Board";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useEffect } from "react";
import { supabase } from "./api/supabaseClient";
import useUserStore from "./store/useUserStore";

function App() {
  const setUser = useUserStore.getState().setUser;

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      }
    });
  }, []);
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Workspace />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board/:boardId" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
