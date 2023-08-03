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
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore.getState().setUser;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        const {
          data: { user },
        } = await supabase.auth.getUser(data.session.access_token);
        setUser(user);
      }
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN" && session?.user) {
        if (session?.user) {
          setUser(session.user);
        }
      }
    });

    if (!user) {
      fetchData();
    }
  }, []);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Workspace />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board/:boardId" element={<Board />} />
        </Route>
      </Routes>
      <div id="popover-parent"></div>
    </div>
  );
}

export default App;
