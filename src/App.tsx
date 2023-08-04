import { Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import Board from "./pages/Board";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useEffect } from "react";
import { supabase } from "./api/supabaseClient";
import useUserStore from "./store/useUserStore";
import useLoadingStore from "./store/useLoadingStore";
import LoadingManager from "./components/LoadingManager";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore.getState().setUser;
  const setLoading = useLoadingStore.getState().setIsLoading;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (data?.session) {
          const {
            data: { user },
          } = await supabase.auth.getUser(data.session.access_token);
          setUser(user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
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
    <LoadingManager>
      <div className="">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Workspace />} />
              <Route path="/board/:boardId" element={<Board />} />
            </Route>
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <div id="popover-parent"></div>
      </div>
    </LoadingManager>
  );
}

export default App;
