import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import Board from "./pages/Board";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Workspace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/board/:boardId" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
